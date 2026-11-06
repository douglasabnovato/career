/* utils.test.js — funções puras de busca e de HTML seguro. Rode com: npm test (ou node --test "tests/*.test.js") */
import { test } from "node:test";
import assert from "node:assert/strict";
import { normalizar, escapar, urlSegura } from "../js/utils.js";

test("normalizar tira acento e caixa alta", () => {
  assert.equal(normalizar("Código Ágil"), "codigo agil");
  assert.equal(normalizar(null), "");
});

test("escapar neutraliza marcação antes de ir para o HTML", () => {
  assert.equal(escapar('<a href="x">\'&</a>'), "&lt;a href=&quot;x&quot;&gt;&#39;&amp;&lt;/a&gt;");
  assert.equal(escapar(undefined), "");
});

const BASE = "https://douglasabnovato.github.io/career/index.html";

test("urlSegura aceita https, http, mailto e caminho relativo", () => {
  assert.equal(urlSegura("https://exemplo.com/vagas", BASE), "https://exemplo.com/vagas");
  assert.equal(urlSegura("http://exemplo.com/", BASE), "http://exemplo.com/");
  assert.equal(urlSegura("mailto:contato@example.com", BASE), "mailto:contato@example.com");
  assert.equal(
    urlSegura("./detalhe.html?tipo=empresas&id=brq", BASE),
    "https://douglasabnovato.github.io/career/detalhe.html?tipo=empresas&id=brq",
  );
  assert.equal(urlSegura("  https://exemplo.com  ", BASE), "https://exemplo.com/");
});

test("urlSegura recusa javascript:, data:, vazio e não-texto", () => {
  assert.equal(urlSegura("javascript:alert(1)", BASE), null);
  assert.equal(urlSegura(" JavaScript:alert(1)", BASE), null);
  assert.equal(urlSegura("data:text/html,<script>alert(1)</script>", BASE), null);
  assert.equal(urlSegura("vbscript:msgbox(1)", BASE), null);
  assert.equal(urlSegura("", BASE), null);
  assert.equal(urlSegura(null, BASE), null);
  assert.equal(urlSegura(42, BASE), null);
});

test("urlSegura sem base (Node, fora do navegador) só aceita URL absoluta", () => {
  assert.equal(urlSegura("https://exemplo.com/"), "https://exemplo.com/");
  assert.equal(urlSegura("./relativo.html"), null);
});
