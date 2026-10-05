/* utils.js — funções puras usadas em busca e renderização segura de HTML. */

/* Deixa o texto em caixa baixa e sem acento, para a busca casar "codigo" com "código". */
export function normalizar(texto) {
  return String(texto ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

/* Neutraliza caracteres de marcação antes de interpolar dado em HTML. */
export function escapar(texto) {
  return String(texto ?? "").replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]
  );
}

/* Fim de utils.js */