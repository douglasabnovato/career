/* filtro-url.test.js — leitura e escrita da seção e da categoria na URL do catálogo. Rode com: npm test */
import { test } from "node:test";
import assert from "node:assert/strict";
import { lerFiltroDaUrl, escreverFiltroNaUrl, categoriasDe, casarCategoria } from "../js/filtro-url.js";

test("lerFiltroDaUrl lê seção e categoria", () => {
  assert.deepEqual(lerFiltroDaUrl("?secao=empresas&categoria=Health%20Tech"), { secao: "companies", categoria: "Health Tech" });
  assert.deepEqual(lerFiltroDaUrl("?secao=vagas&categoria=Freelance+Platform"), {
    secao: "jobs",
    categoria: "Freelance Platform",
  });
  assert.deepEqual(lerFiltroDaUrl("secao=perfis"), { secao: "profiles", categoria: "" });
});

test("lerFiltroDaUrl ignora seção desconhecida e categoria em currículos", () => {
  assert.deepEqual(lerFiltroDaUrl(""), { secao: null, categoria: "" });
  assert.deepEqual(lerFiltroDaUrl("?secao=xyz"), { secao: null, categoria: "" });
  assert.deepEqual(lerFiltroDaUrl("?secao=Currículos&categoria=Escola"), { secao: "curriculos", categoria: "" });
  assert.deepEqual(lerFiltroDaUrl(undefined), { secao: null, categoria: "" });
});

test("escreverFiltroNaUrl grava seção e categoria e preserva outros parâmetros", () => {
  assert.equal(escreverFiltroNaUrl("", { secao: "companies", categoria: "Health Tech" }), "?secao=empresas&categoria=Health+Tech");
  assert.equal(escreverFiltroNaUrl("?utm=x&secao=vagas", { secao: "profiles", categoria: "" }), "?utm=x&secao=perfis");
  assert.equal(escreverFiltroNaUrl("?secao=empresas&categoria=A", { secao: "curriculos", categoria: "A" }), "?secao=curriculos");
  assert.equal(escreverFiltroNaUrl("?secao=empresas", { secao: "inexistente", categoria: "" }), "");
});

test("escrever e ler a URL devolve o mesmo filtro", () => {
  const filtro = { secao: "jobs", categoria: "Educação & Carreira" };
  assert.deepEqual(lerFiltroDaUrl(escreverFiltroNaUrl("", filtro)), filtro);
});

test("categoriasDe tira repetidas, usa Geral para item sem categoria e ordena", () => {
  const lista = [{ category: "Software House" }, { category: "health tech" }, { category: "Health Tech" }, {}, { category: "Educação" }];
  assert.deepEqual(categoriasDe(lista), ["Educação", "Geral", "health tech", "Software House"]);
  assert.deepEqual(categoriasDe(null), []);
});

test("casarCategoria acha a categoria sem diferenciar caixa e acento", () => {
  const categorias = ["Educação", "Health Tech"];
  assert.equal(casarCategoria(categorias, "educacao"), "Educação");
  assert.equal(casarCategoria(categorias, " HEALTH TECH "), "Health Tech");
  assert.equal(casarCategoria(categorias, "Fintech"), "");
  assert.equal(casarCategoria(categorias, ""), "");
});
