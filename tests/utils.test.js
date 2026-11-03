/* utils.test.js — funções puras de busca e de HTML seguro. Rode com: npm test (ou node --test "tests/*.test.js") */
import { test } from "node:test";
import assert from "node:assert/strict";
import { normalizar, escapar } from "../js/utils.js";

test("normalizar tira acento e caixa alta", () => {
  assert.equal(normalizar("Código Ágil"), "codigo agil");
  assert.equal(normalizar(null), "");
});

test("escapar neutraliza marcação antes de ir para o HTML", () => {
  assert.equal(escapar('<a href="x">\'&</a>'), "&lt;a href=&quot;x&quot;&gt;&#39;&amp;&lt;/a&gt;");
  assert.equal(escapar(undefined), "");
});
