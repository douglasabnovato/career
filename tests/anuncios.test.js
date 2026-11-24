/* anuncios.test.js — o leitor de tela anuncia só a contagem, e não os cards inteiros (career#47). */
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { textoContador } from "../js/utils.js";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

test("a grade de cards não é uma região viva (o leitor leria todos os cards a cada filtro)", () => {
  const grade = html.match(/<div[^>]*id="box-projects"[^>]*>/)?.[0] ?? "";
  assert.ok(grade, "a grade #box-projects existe");
  assert.doesNotMatch(grade, /aria-live/);
});

test("o contador é a região viva: role status, polite e atômico", () => {
  const contador = html.match(/<span[^>]*id="items-counter"[^>]*>/)?.[0] ?? "";
  assert.match(contador, /role="status"/);
  assert.match(contador, /aria-live="polite"/);
  assert.match(contador, /aria-atomic="true"/);
});

test("o contador diz a contagem e, com 0, a saída (R19 do Esp UX/UI do career#48)", () => {
  const empresas = { singular: "empresa", rotulo: "empresas" };
  assert.equal(textoContador(8, 43, empresas), "Mostrando 8 de 43 empresas");
  assert.equal(textoContador(1, 1, empresas), "Mostrando 1 de 1 empresa");
  assert.equal(textoContador(0, 0, empresas), "Nenhuma empresa com estes filtros. Use Limpar filtros");
});
