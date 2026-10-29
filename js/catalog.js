/* catalog.js — carrega o catálogo (empresas, vagas, perfis, destaques) da API learntech-content. */

import { buscarRecurso, resolverMidia } from "./api.js";

/* Busca o catálogo na API; devolve null quando ela falha, e o site segue com os dados locais. */
export async function carregarCatalogo() {
  try {
    const [c, j, p, d] = await Promise.all(
      ["empresas", "vagas", "perfis", "destaques"].map((nome) => buscarRecurso(`career/${nome}.json`))
    );
    /* Resposta fora do formato esperado (não-lista) cai nos dados locais, em vez de quebrar a renderização. */
    if (![c, j, p].every(Array.isArray)) throw new Error("catálogo remoto fora do formato esperado");
    /* Modelos de currículo vêm à parte: se falharem, o catálogo segue e a seção usa a cópia local. */
    const curriculos = await buscarRecurso("career/modelos-curriculo.json").then((m) => (Array.isArray(m) ? m : null)).catch(() => null);
    return { companies: resolverMidia(c), jobs: resolverMidia(j), profiles: resolverMidia(p), destaques: d, curriculos };
  } catch (e) {
    console.warn("[learntech-content] usando dados locais:", e.message);
    return null;
  }
}

/* Busca um item de empresas, vagas ou perfis pelo slug, para a página de detalhe.
   Devolve o item (ou null se não existir); rejeita quando a API não está configurada, falha ou responde fora do formato. */
export async function carregarItem(tipo, slug) {
  const lista = await buscarRecurso(`career/${tipo}.json`);
  if (!Array.isArray(lista)) throw new Error(`career/${tipo}.json fora do formato esperado`);
  return resolverMidia(lista).find((item) => item && item.slug === slug) || null;
}

/* Fim de catalog.js */