/* catalog.js — carrega o catálogo (empresas, vagas, perfis, destaques) da API learntech-content. */

import { buscarRecurso, resolverMidia } from "./api.js";

/* Recurso opcional: falha ou formato errado viram null, e o site usa a cópia local só daquela parte. */
const opcional = (caminho, valido) =>
  buscarRecurso(caminho)
    .then((dados) => (valido(dados) ? dados : null))
    .catch(() => null);

/* Busca o catálogo na API; devolve null quando ela falha, e o site segue com os dados locais.
   Só empresas, vagas e perfis decidem isso. Destaques e modelos de currículo vêm à parte (career#39):
   se falharem, o catálogo continua da API e só o banner ou a seção de currículos usam a cópia local. */
export async function carregarCatalogo() {
  const destaques = opcional("career/destaques.json", (d) => Boolean(d) && typeof d === "object" && !Array.isArray(d));
  const curriculos = opcional("career/modelos-curriculo.json", Array.isArray);
  try {
    const [c, j, p] = await Promise.all(["empresas", "vagas", "perfis"].map((nome) => buscarRecurso(`career/${nome}.json`)));
    /* Resposta fora do formato esperado (não-lista) cai nos dados locais, em vez de quebrar a renderização. */
    if (![c, j, p].every(Array.isArray)) throw new Error("catálogo remoto fora do formato esperado");
    return {
      companies: resolverMidia(c),
      jobs: resolverMidia(j),
      profiles: resolverMidia(p),
      destaques: await destaques,
      curriculos: await curriculos,
    };
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
