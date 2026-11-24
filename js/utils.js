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
/* Rótulos de cada seção, com gênero e número certos para o estado vazio (R19 do Esp UX/UI do career#48, reconferência):
   "Nenhuma empresa", mas "Nenhum dev" e "Nenhum currículo". */
export const ROTULOS_SECOES = {
  companies: { rotulo: "empresas", singular: "empresa", nenhum: "Nenhuma empresa", encontrado: "encontrada" },
  jobs: { rotulo: "plataformas", singular: "plataforma", nenhum: "Nenhuma plataforma", encontrado: "encontrada" },
  profiles: { rotulo: "devs", singular: "dev", nenhum: "Nenhum dev", encontrado: "encontrado" },
  curriculos: { rotulo: "currículos", singular: "currículo", nenhum: "Nenhum currículo", encontrado: "encontrado" },
};

export function textoContador(exibidos, total, secao) {
  if (total === 0) return `${secao.nenhum} com estes filtros. Use Limpar filtros`;
  return `Mostrando ${exibidos} de ${total} ${total === 1 ? secao.singular : secao.rotulo}`;
}
