/* estilos-assincronos.js — CSS de terceiros (fontes e ícones) sem bloquear a renderização.
   No HTML, esses <link> vêm com media="print" e data-assincrono: o navegador baixa sem bloquear o desenho.
   Quando chegam, viram media="all". Fica em arquivo, e não no onload do <link>, porque a CSP não aceita
   handler inline. Sem JavaScript, o <noscript> ao lado carrega o mesmo CSS do jeito normal. */

(function () {
  function ativar(link) {
    link.media = "all";
  }
  var links = document.querySelectorAll("link[data-assincrono]");
  for (var i = 0; i < links.length; i++) {
    var link = links[i];
    if (link.sheet) ativar(link);
    else link.addEventListener("load", ativar.bind(null, link));
  }
})();

/* Fim de estilos-assincronos.js */
