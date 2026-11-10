/* filtro-url.js — seção e categoria do catálogo na URL (?secao=&categoria=). Funções puras, sem DOM. */

import { normalizar } from "./utils.js";

/* Nome da seção na URL (português) para o nome interno do app. */
export const SECAO_DA_URL = { empresas: "companies", vagas: "jobs", perfis: "profiles", curriculos: "curriculos" };

const URL_DA_SECAO = Object.fromEntries(Object.entries(SECAO_DA_URL).map(([url, interno]) => [interno, url]));

/* Seções que têm filtro por categoria. Currículos não têm categoria. */
export const SECOES_COM_CATEGORIA = ["companies", "jobs", "profiles"];

/* Lê a query da URL. Devolve { secao, categoria }: secao é o nome interno ou null; categoria é texto ou "". */
export function lerFiltroDaUrl(busca) {
  const params = new URLSearchParams(busca || "");
  const secao = SECAO_DA_URL[normalizar(params.get("secao")).trim()] || null;
  const categoria = (params.get("categoria") || "").trim();

  return { secao, categoria: secao && !SECOES_COM_CATEGORIA.includes(secao) ? "" : categoria };
}

/* Escreve seção e categoria na query, sem perder os outros parâmetros. Categoria vazia sai da URL. */
export function escreverFiltroNaUrl(busca, { secao, categoria }) {
  const params = new URLSearchParams(busca || "");
  const secaoUrl = URL_DA_SECAO[secao];

  if (secaoUrl) params.set("secao", secaoUrl);
  else params.delete("secao");

  if (categoria && SECOES_COM_CATEGORIA.includes(secao)) params.set("categoria", categoria);
  else params.delete("categoria");

  const query = params.toString();

  return query ? `?${query}` : "";
}

/* Categoria de um item; sem categoria, o card mostra "Geral". */
export function categoriaDe(item) {
  return (item && item.category) || "Geral";
}

/* Categorias distintas da lista, em ordem alfabética. */
export function categoriasDe(lista) {
  const unicas = new Map();

  for (const item of lista || []) {
    const categoria = categoriaDe(item);
    const chave = normalizar(categoria);

    if (!unicas.has(chave)) unicas.set(chave, categoria);
  }

  return [...unicas.values()].sort((a, b) => a.localeCompare(b, "pt-BR"));
}

/* Acha, na lista de categorias, a que casa com o valor (sem diferenciar caixa e acento). "" se não houver. */
export function casarCategoria(categorias, valor) {
  const alvo = normalizar(valor).trim();

  if (!alvo) return "";

  return (categorias || []).find((c) => normalizar(c) === alvo) || "";
}

/* Fim de filtro-url.js */
