/* tema-inicial.js — aplica o tema salvo (ou o do sistema) antes da primeira pintura, para a página não piscar.
   Script clássico e síncrono no <head>: fica num arquivo porque a CSP não libera script inline (career#32). */
(function () {
  try {
    var salvo = localStorage.getItem("career:theme");
    var claro = window.matchMedia("(prefers-color-scheme: light)").matches;
    document.documentElement.setAttribute("data-theme", salvo || (claro ? "light" : "dark"));
  } catch {
    document.documentElement.setAttribute("data-theme", "dark");
  }
})();

/* Fim de tema-inicial.js */
