/* anuncios.test.js — o leitor de tela anuncia só a contagem, e não os cards inteiros (career#47). */
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

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
