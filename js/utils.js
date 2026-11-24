/* utils.js — funções puras usadas em busca e renderização segura de HTML e de links. */

/* Deixa o texto em caixa baixa e sem acento, para a busca casar "codigo" com "código". */
export function normalizar(texto) {
  return String(texto ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

/* Neutraliza caracteres de marcação antes de interpolar dado em HTML. */
export function escapar(texto) {
  return String(texto ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

const ESQUEMAS_SEGUROS = ["https:", "http:", "mailto:"];

/* Devolve a URL absoluta só se o esquema for https:, http: ou mailto: (caminho relativo resolve pela base, a página atual).
   Qualquer outro esquema (javascript:, data:, vbscript:...) ou valor vazio/inválido vira null. */
export function urlSegura(valor, base = globalThis.location?.href) {
  if (typeof valor !== "string" || !valor.trim()) return null;
  try {
    const url = new URL(valor.trim(), base);
    return ESQUEMAS_SEGUROS.includes(url.protocol) ? url.href : null;
  } catch (e) {
    void e;
    return null;
  }
}

/* Fim de utils.js */

/* Texto do contador, que é a região viva da lista (career#47 e R19 do #48): com resultados, "Mostrando 8 de 43 empresas";
   com 0, diz também a saída, porque o botão "Limpar filtros" fica na grade, que não é anunciada. */
export function textoContador(exibidos, total, secao) {
  if (total === 0) return `Nenhuma ${secao.singular} com estes filtros. Use Limpar filtros`;
  return `Mostrando ${exibidos} de ${total} ${total === 1 ? secao.singular : secao.rotulo}`;
}
