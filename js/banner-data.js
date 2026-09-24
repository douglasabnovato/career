/* banner-data.js — seleção curada para o carrossel de destaques.
   Puxa direto dos arrays reais, sem duplicar dado. A busca é tolerante a
   caixa e acento para que renomear um item no catálogo não apague o destaque. */

import { companies } from "./good-companies.js";
import { jobs } from "./jobs.js";
import { profiles } from "./perfis-dev.js";

/* Acha um item pelo título, ignorando caixa e acento; devolve null se sumiu. */
function porTitulo(lista, nome, rotulo) {
  const chave = (t) =>
    String(t ?? "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .trim();

  const achado = lista.find((item) => chave(item.title) === chave(nome));

  if (!achado) {
    console.warn(`[banner] destaque "${nome}" não existe mais no catálogo e foi omitido.`);
    return null;
  }

  return { ...achado, badgeLabel: rotulo };
}

export const launchBanner = [
  porTitulo(jobs, "GeekHunter", "Oportunidade"),
  porTitulo(companies, "Rocketseat", "Empresa"),
  porTitulo(profiles, "Filipe Deschamps", "Dev"),
].filter(Boolean);

/* Fim de banner-data.js */
