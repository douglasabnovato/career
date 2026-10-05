/* theme.js — alterna tema claro/escuro e mantém o ícone sincronizado com data-theme. */

const CHAVE_TEMA = "career:theme";

/* Atualiza o ícone do botão conforme o tema atual aplicado no <html>. */
function sincronizarIcone(iconeTema) {
  const tema = document.documentElement.getAttribute("data-theme");
  if (iconeTema) {
    iconeTema.className = tema === "dark" ? "bx bx-sun" : "bx bx-moon";
  }
}

/* Sincroniza o ícone ao carregar e liga o clique que alterna o tema e salva a escolha. */
export function inicializarTema({ iconeTema, botaoTema }) {
  sincronizarIcone(iconeTema);

  botaoTema?.addEventListener("click", () => {
    const raiz = document.documentElement;
    const novo = raiz.getAttribute("data-theme") === "dark" ? "light" : "dark";
    raiz.setAttribute("data-theme", novo);
    try {
      localStorage.setItem(CHAVE_TEMA, novo);
    } catch (e) {
      void e;
    }
    sincronizarIcone(iconeTema);
  });
}

/* Fim de theme.js */