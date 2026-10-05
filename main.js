/* main.js — bootstrap do portal Career: carrega identificação, tenta o catálogo remoto e inicializa o app. */

import { App } from "./js/app.js";
import { carregarCatalogo } from "./js/catalog.js";
import { carregarIdentificacao, esperarAte } from "./js/api.js";
import "./js/company-modal.js";

const ESPERA_API_MS = 1500;

carregarIdentificacao("career");
const remoto = carregarCatalogo();
const primeiro = await esperarAte(remoto, ESPERA_API_MS);
if (primeiro) App.usarCatalogo(primeiro);
App.init();
if (primeiro === undefined) {
  remoto.then((cat) => {
    if (!cat) return;
    App.usarCatalogo(cat);
    App.buscar(App.el.busca.value);
  });
}

/* Fim de main.js */