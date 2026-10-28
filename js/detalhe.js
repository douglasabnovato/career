/* detalhe.js — página de detalhe de empresa, plataforma de vagas ou profissional (detalhe.html#tipo=...&id=..., também aceita ?tipo=...&id=...). */

import { API_CONFIGURADA, carregarIdentificacao } from "./api.js";
import { carregarItem } from "./catalog.js";
import { inicializarTema } from "./theme.js";

const CHAVE_SECAO = "career:secao";
const LOGO_PADRAO = "./assets/logo/logo-career.png";
const TITULO_SITE = "Career | learnTECH";

/* Cada tipo aceito na URL: rótulo exibido, seção do index de onde veio e campo secundário do card. */
const TIPOS = {
  empresas: { rotulo: "Empresa", secao: "companies", secundario: "location" },
  vagas: { rotulo: "Plataforma de vagas", secao: "jobs", secundario: "duration" },
  perfis: { rotulo: "Profissional", secao: "profiles", secundario: "duration" },
};

const SLUG_VALIDO = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const VIDEO_VALIDO = /^https:\/\/www\.youtube(-nocookie)?\.com\/embed\/([\w-]{11})$/;
const DATA_VALIDA = /^(\d{4})-(\d{2})-(\d{2})$/;

const $ = (id) => document.getElementById(id);

/* Devolve a URL absoluta só se for http(s); qualquer outro esquema (javascript:, data:...) vira null. */
function urlSegura(valor) {
  if (typeof valor !== "string" || !valor.trim()) return null;
  try {
    const url = new URL(valor, window.location.href);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : null;
  } catch (e) {
    void e;
    return null;
  }
}

function texto(valor) {
  return typeof valor === "string" ? valor.trim() : "";
}

/* "AAAA-MM-DD" para "dd/mm/aaaa"; devolve "" se o formato não bater. */
function formatarData(iso) {
  const m = DATA_VALIDA.exec(texto(iso));
  return m ? `${m[3]}/${m[2]}/${m[1]}` : "";
}

/* Guarda a seção para o index reabrir nela (mesma chave e valores que app.js usa). */
function salvarSecao(secao) {
  try {
    localStorage.setItem(CHAVE_SECAO, secao);
  } catch (e) {
    void e;
  }
}

function definirMeta(titulo, descricao) {
  document.title = titulo ? `${titulo} | ${TITULO_SITE}` : TITULO_SITE;
  const meta = document.querySelector('meta[name="description"]');
  if (meta && descricao) {
    meta.setAttribute("content", descricao.length > 160 ? `${descricao.slice(0, 157).trimEnd()}...` : descricao);
  }
  document.querySelector('meta[property="og:title"]')?.setAttribute("content", document.title);
}

/* Mostra o bloco de estado (carregando, não encontrado, erro) e esconde o artigo. */
function mostrarEstado(titulo, mensagem, { tentar = false, voltar = true } = {}) {
  $("detalhe").hidden = true;
  $("detalhe-estado").hidden = false;
  $("estado-titulo").textContent = titulo;
  $("estado-texto").textContent = mensagem;
  $("estado-tentar").hidden = !tentar;
  $("estado-voltar").hidden = !voltar;
  definirMeta(titulo === "Carregando..." ? "Detalhes" : titulo, "");
}

function criar(tag, classe, conteudo) {
  const el = document.createElement(tag);
  if (classe) el.className = classe;
  if (conteudo) el.textContent = conteudo;
  return el;
}

/* Lista de links externos (redes oficiais ou fontes); itens com URL inválida são ignorados. */
function preencherLinks(lista, secaoId, ulId) {
  const ul = $(ulId);
  ul.replaceChildren();
  (Array.isArray(lista) ? lista : []).forEach((link) => {
    const url = urlSegura(link?.url);
    const rotulo = texto(link?.label);
    if (!url || !rotulo) return;
    const li = document.createElement("li");
    const a = criar("a", "detalhe-link", rotulo);
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.setAttribute("aria-label", `${rotulo} (abre em nova aba)`);
    const icone = criar("i", "bx bx-link-external");
    icone.setAttribute("aria-hidden", "true");
    a.appendChild(icone);
    li.appendChild(a);
    ul.appendChild(li);
  });
  $(secaoId).hidden = ul.children.length === 0;
}

function preencherGaleria(imagens) {
  const galeria = $("detalhe-galeria");
  galeria.replaceChildren();
  (Array.isArray(imagens) ? imagens : []).forEach((imagem) => {
    const url = urlSegura(imagem?.url);
    const alt = texto(imagem?.alt);
    if (!url || !alt) return;
    const figura = criar("figure", "detalhe-figura");
    const img = document.createElement("img");
    img.src = url;
    img.alt = alt;
    img.loading = "lazy";
    img.decoding = "async";
    img.addEventListener("error", () => figura.remove(), { once: true });
    figura.appendChild(img);
    const legenda = texto(imagem?.legenda);
    if (legenda) figura.appendChild(criar("figcaption", "", legenda));
    galeria.appendChild(figura);
  });
  $("secao-galeria").hidden = galeria.children.length === 0;
}

/* Aceita só o embed do YouTube do contrato e troca o host para youtube-nocookie. */
function preencherVideo(video, titulo) {
  const caixa = $("detalhe-video");
  caixa.replaceChildren();
  const m = VIDEO_VALIDO.exec(texto(video));
  if (m) {
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube-nocookie.com/embed/${m[2]}`;
    iframe.title = `Vídeo sobre ${titulo}`;
    iframe.loading = "lazy";
    iframe.allow = "accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    caixa.appendChild(iframe);
  }
  $("secao-video").hidden = !m;
}

function renderizar(item, config) {
  const d = item.detalhe;
  const titulo = texto(item.title) || "Sem título";
  const resumo = texto(d.resumo);

  const thumb = $("detalhe-thumb");
  thumb.src = urlSegura(item.thumb) || LOGO_PADRAO;
  thumb.alt = `Logo de ${titulo}`;
  thumb.addEventListener("error", () => (thumb.src = LOGO_PADRAO), { once: true });

  $("detalhe-tipo").textContent = config.rotulo;
  $("detalhe-titulo").textContent = titulo;
  $("detalhe-categoria").textContent = texto(item.category) || "Geral";
  const secundario = texto(item[config.secundario]);
  $("detalhe-secundario").textContent = secundario;
  $("detalhe-secundario").hidden = !secundario;
  $("detalhe-resumo").textContent = resumo;
  $("detalhe-resumo").hidden = !resumo;

  const site = urlSegura(item.site_url);
  const botaoSite = $("detalhe-site");
  botaoSite.hidden = !site;
  if (site) {
    botaoSite.href = site;
    botaoSite.setAttribute("aria-label", `Acessar site oficial de ${titulo} (abre em nova aba)`);
  }

  const corpo = $("detalhe-texto");
  corpo.replaceChildren(
    ...(Array.isArray(d.paragrafos) ? d.paragrafos : []).map(texto).filter(Boolean).map((p) => criar("p", "", p)),
  );

  preencherGaleria(d.imagens);
  preencherVideo(d.video, titulo);
  preencherLinks(d.links, "secao-links", "detalhe-links");
  preencherLinks(d.fontes, "secao-fontes", "detalhe-fontes");

  const data = formatarData(d.atualizadoEm);
  const atualizado = $("detalhe-atualizado");
  atualizado.replaceChildren();
  atualizado.hidden = !data;
  if (data) {
    const tempo = criar("time", "", data);
    tempo.dateTime = texto(d.atualizadoEm);
    atualizado.append("Atualizado em ", tempo);
  }

  definirMeta(titulo, resumo);
  $("detalhe-estado").hidden = true;
  $("detalhe").hidden = false;
}

async function carregar(tipo, id) {
  const config = TIPOS[tipo];

  if (!config || !SLUG_VALIDO.test(id)) {
    mostrarEstado("Página não encontrada", "O endereço não aponta para nenhuma empresa, plataforma ou perfil do catálogo.");
    return;
  }

  if (!API_CONFIGURADA) {
    mostrarEstado(
      "Detalhes indisponíveis",
      "As páginas de detalhe ainda não estão disponíveis neste endereço. Você pode continuar explorando o catálogo.",
    );
    return;
  }

  mostrarEstado("Carregando...", "Aguarde um momento enquanto buscamos os detalhes.", { voltar: false });

  let item;
  try {
    item = await carregarItem(tipo, id);
  } catch (e) {
    console.warn("[learntech-content] detalhe indisponível:", e.message);
    mostrarEstado(
      "Não foi possível carregar",
      "O serviço de conteúdo não respondeu agora. Tente novamente em instantes ou volte ao catálogo.",
      { tentar: true },
    );
    return;
  }

  if (!item || !item.detalhe || typeof item.detalhe !== "object") {
    mostrarEstado("Página não encontrada", "Este item não existe mais no catálogo ou ainda não tem página de detalhe.");
    return;
  }

  renderizar(item, config);
}

function ligarNavegacao(secaoDeOrigem) {
  /* "Voltar" reabre o index na seção de onde o item veio. */
  [$("detalhe-voltar"), $("estado-voltar")].forEach((link) => {
    link?.addEventListener("click", () => {
      if (secaoDeOrigem) salvarSecao(secaoDeOrigem);
    });
  });

  document.querySelectorAll(".nav-link[data-secao]").forEach((link) => {
    link.classList.toggle("active", link.dataset.secao === secaoDeOrigem);
    link.addEventListener("click", () => salvarSecao(link.dataset.secao));
  });

  const menuToggle = $("menu-toggle");
  const menu = $("header-menu");
  menuToggle?.addEventListener("click", () => {
    const aberto = menu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(aberto));
  });
}

const parametros = new URLSearchParams(window.location.search || window.location.hash.slice(1)); /* aceita ?tipo=&id= e #tipo=&id= */
const tipo = parametros.get("tipo") || "";
const id = parametros.get("id") || "";

carregarIdentificacao("career");
inicializarTema({ iconeTema: $("theme-icon"), botaoTema: $("theme-toggle") });
$("year").textContent = new Date().getFullYear();
ligarNavegacao(TIPOS[tipo]?.secao);
$("estado-tentar").addEventListener("click", () => carregar(tipo, id));
carregar(tipo, id);

/* Fim de detalhe.js */
