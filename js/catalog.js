/* catalog.js — carrega o catálogo (empresas, vagas, perfis, destaques) da API learntech-content. */

import { buscarRecurso, resolverMidia } from "./api.js";

/* Busca o catálogo na API; devolve null quando ela falha, e o site segue com os dados locais. */
export async function carregarCatalogo() {
  try {
    const [c, j, p, d] = await Promise.all(
      ["empresas", "vagas", "perfis", "destaques"].map((nome) => buscarRecurso(`career/${nome}.json`))
    );
    return { companies: resolverMidia(c), jobs: resolverMidia(j), profiles: resolverMidia(p), destaques: d };
  } catch (e) {
    console.warn("[learntech-content] usando dados locais:", e.message);
    return null;
  }
}

/* Fim de catalog.js */