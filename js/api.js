/* api.js — cliente da API learntech-content: busca com tempo limite, resolve /media/ e injeta o script de identificação. */

import { API_URL } from "./config.js";

const BASE = API_URL.includes("SEU-SUBDOMINIO") ? "" : API_URL.replace(/\/$/, "");
const TEMPO_LIMITE_MS = 5000;

/* Indica se a API está configurada em js/config.js (sem ela, só os dados locais existem). */
export const API_CONFIGURADA = Boolean(BASE);

/* Busca GET /v1/{caminho}; rejeita quando a API não está configurada, falha ou passa do tempo limite. */
export async function buscarRecurso(caminho) {
  if (!BASE) throw new Error("API_URL não configurada em js/config.js");
  const controle = new AbortController();
  const timer = setTimeout(() => controle.abort(), TEMPO_LIMITE_MS);
  try {
    const r = await fetch(`${BASE}/v1/${caminho}`, { signal: controle.signal });
    if (!r.ok) throw new Error(`${r.status} em ${caminho}`);
    return await r.json();
  } finally {
    clearTimeout(timer);
  }
}

/* Completa um caminho /media/... da API com o endereço dela; outros valores passam como estão. */
function urlDeMidia(url) {
  return typeof url === "string" && url.startsWith("/media/") ? BASE + url : url;
}

/* Troca caminhos /media/... da API pela URL completa (miniatura e imagens da página de detalhe). */
export function resolverMidia(lista) {
  return lista.map((item) => {
    if (!item || typeof item !== "object") return item;
    const novo = { ...item, thumb: urlDeMidia(item.thumb) };
    if (item.detalhe && Array.isArray(item.detalhe.imagens)) {
      novo.detalhe = {
        ...item.detalhe,
        imagens: item.detalhe.imagens.map((img) => (img && typeof img === "object" ? { ...img, url: urlDeMidia(img.url) } : img)),
      };
    }
    return novo;
  });
}

/* Espera a primeira resposta por um tempo curto; devolve undefined se ainda não chegou. */
export function esperarAte(promessa, ms) {
  return Promise.race([promessa, new Promise((ok) => setTimeout(() => ok(undefined), ms))]);
}

/* Injeta uma vez o script único de identificação do ecossistema (nome e e-mail, sem login). */
export function carregarIdentificacao(projeto) {
  if (!BASE || document.getElementById("learntech-sdk")) return;
  const s = document.createElement("script");
  s.id = "learntech-sdk";
  s.src = `${BASE}/sdk/identificacao.js`;
  s.defer = true;
  s.dataset.projeto = projeto;
  s.dataset.privacidade = "https://learn-tech-pied.vercel.app/privacy";
  document.head.appendChild(s);
}

/* Fim de api.js */
