/* dados.test.js — contrato das cópias de reserva geradas pela API (js/*.js). */
import { test } from "node:test";
import assert from "node:assert/strict";
import { companies } from "../js/good-companies.js";
import { jobs } from "../js/jobs.js";
import { profiles } from "../js/perfis-dev.js";
import { curriculos } from "../js/curriculos.js";

for (const [nome, lista] of Object.entries({ companies, jobs, profiles })) {
  test(`${nome}: títulos únicos, site e categoria preenchidos`, () => {
    assert.ok(lista.length > 0);
    const titulos = lista.map((i) => i.title.toLowerCase());
    assert.equal(new Set(titulos).size, titulos.length);
    for (const i of lista) {
      assert.match(i.site_url, /^https?:\/\//, i.title);
      assert.ok(i.category, i.title);
    }
  });
}

test("currículos são fictícios e com contatos de exemplo", () => {
  assert.ok(curriculos.length >= 3);
  for (const m of curriculos) {
    assert.equal(m.ficticio, true, m.slug);
    assert.equal(m.contato.telefone, "(00) 00000-0000", m.slug);
    assert.match(m.contato.email, /@example\.com$/, m.slug);
  }
});
