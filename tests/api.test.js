/* api.test.js — cliente da API e carga do catálogo, com fetch simulado (sem rede). */
import { test, afterEach } from "node:test";
import assert from "node:assert/strict";
import { buscarRecurso, resolverMidia, API_CONFIGURADA } from "../js/api.js";
import { carregarCatalogo, carregarItem } from "../js/catalog.js";

const original = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = original;
});
const responder = (mapa) => {
  globalThis.fetch = async (url) => {
    const chave = Object.keys(mapa).find((k) => String(url).endsWith(k));
    if (!chave) return { ok: false, status: 404, json: async () => ({}) };
    return { ok: true, status: 200, json: async () => mapa[chave] };
  };
};

test("a API está configurada em js/config.js", () => assert.equal(API_CONFIGURADA, true));

test("buscarRecurso rejeita quando a API responde erro", async () => {
  responder({});
  await assert.rejects(buscarRecurso("career/empresas.json"), /404/);
});

test("resolverMidia completa só caminhos /media/", () => {
  const [a, b] = resolverMidia([
    { thumb: "/media/x.webp", detalhe: { imagens: [{ url: "/media/y.webp", alt: "y" }] } },
    { thumb: "./assets/z.png" },
  ]);
  assert.match(a.thumb, /^https:\/\/.+\/media\/x\.webp$/);
  assert.match(a.detalhe.imagens[0].url, /\/media\/y\.webp$/);
  assert.equal(b.thumb, "./assets/z.png");
});

test("carregarCatalogo devolve null e não quebra quando a API falha", async () => {
  responder({});
  const original = console.warn;
  console.warn = () => {};
  assert.equal(await carregarCatalogo(), null);
  console.warn = original;
});

test("carregarCatalogo monta empresas, vagas, perfis e currículos", async () => {
  responder({
    "empresas.json": [{ title: "A", thumb: "/media/a.webp" }],
    "vagas.json": [],
    "perfis.json": [],
    "destaques.json": {},
    "modelos-curriculo.json": [{ slug: "m" }],
  });
  const c = await carregarCatalogo();
  assert.equal(c.companies.length, 1);
  assert.match(c.companies[0].thumb, /\/media\/a\.webp$/);
  assert.equal(c.curriculos[0].slug, "m");
});

test("destaques com falha não derrubam o catálogo: só o banner usa a cópia local (#39)", async () => {
  responder({
    "empresas.json": [{ title: "A", thumb: "" }],
    "vagas.json": [{ title: "V", thumb: "" }],
    "perfis.json": [{ title: "P", thumb: "" }],
    "modelos-curriculo.json": [{ slug: "m" }],
  });
  const c = await carregarCatalogo();
  assert.notEqual(c, null);
  assert.equal(c.companies[0].title, "A");
  assert.equal(c.jobs[0].title, "V");
  assert.equal(c.profiles[0].title, "P");
  assert.equal(c.destaques, null);
  assert.equal(c.curriculos[0].slug, "m");
});

test("destaques fora do formato viram null e o catálogo segue da API", async () => {
  responder({ "empresas.json": [], "vagas.json": [], "perfis.json": [], "destaques.json": ["lista"] });
  const c = await carregarCatalogo();
  assert.notEqual(c, null);
  assert.equal(c.destaques, null);
  assert.equal(c.curriculos, null);
});

test("falha num recurso principal ainda leva o catálogo inteiro para a cópia local", async () => {
  responder({ "empresas.json": [], "perfis.json": [], "destaques.json": {} });
  const aviso = console.warn;
  console.warn = () => {};
  assert.equal(await carregarCatalogo(), null);
  console.warn = aviso;
});

test("carregarItem acha pelo slug e devolve null quando não existe", async () => {
  responder({ "empresas.json": [{ title: "A", slug: "a", thumb: "" }] });
  assert.equal((await carregarItem("empresas", "a")).title, "A");
  assert.equal(await carregarItem("empresas", "b"), null);
});
