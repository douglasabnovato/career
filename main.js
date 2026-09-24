/* main.js — motor do portal Career.
   Orquestra estado, renderização, busca, paginação, tema e o carrossel de destaques. */

import { companies } from "./js/good-companies.js";
import { jobs } from "./js/jobs.js";
import { profiles } from "./js/perfis-dev.js";
import { launchBanner } from "./js/banner-data.js";

const CHAVE_TEMA = "career:theme";
const CHAVE_SECAO = "career:secao";

/* Deixa o texto em caixa baixa e sem acento, para a busca casar "codigo" com "código". */
function normalizar(texto) {
  return String(texto ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

/* Neutraliza caracteres de marcação antes de interpolar dado em HTML. */
function escapar(texto) {
  return String(texto ?? "").replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]
  );
}

const App = {
  state: {
    secaoAtual: "companies",
    dados: { companies, jobs, profiles },
    filtrados: [],
    visiveis: 8,
    lote: 6,
  },

  el: {
    container: document.querySelector("#box-projects"),
    template: document.querySelector("#card-template"),
    busca: document.querySelector("#search-input"),
    navLinks: document.querySelectorAll(".nav-link"),
    titulo: document.querySelector("#section-title"),
    subtitulo: document.querySelector("#section-subtitle"),
    contador: document.querySelector("#items-counter"),
    ano: document.querySelector("#year"),
    iconeTema: document.querySelector("#theme-icon"),
    botaoTema: document.querySelector("#theme-toggle"),
    menuToggle: document.querySelector("#menu-toggle"),
    menu: document.querySelector("#header-menu"),
    verMais: document.querySelector("#load-more"),
    fim: document.querySelector("#end-message"),
    bannerTrack: document.querySelector("#banner-track"),
    bannerDots: document.querySelector("#banner-dots"),
  },

  secoes: {
    companies: {
      titulo: 'Good <span class="highlight">Companies</span>',
      subtitulo: "Empresas com cultura sólida e oportunidades desafiadoras.",
      rotulo: "empresas",
      singular: "empresa",
      acao: "Ver Empresa",
    },
    jobs: {
      titulo: 'Plataformas <span class="highlight">Jobs</span>',
      subtitulo: "Os melhores lugares para buscar sua próxima vaga tech.",
      rotulo: "plataformas",
      singular: "plataforma",
      acao: "Ver Oportunidade",
    },
    profiles: {
      titulo: 'Dev <span class="highlight">Profiles</span>',
      subtitulo: "Referências e mentores que inspiram a comunidade.",
      rotulo: "devs",
      singular: "dev",
      acao: "Ver Perfil",
    },
  },

  /* Ponto de partida: lê a preferência salva, monta a tela e liga os eventos. */
  init() {
    this.state.secaoAtual = this.lerSecaoSalva();
    this.definirAno();
    this.sincronizarIconeTema();
    this.ligarEventos();
    this.trocarSecao(this.state.secaoAtual, true);
    this.iniciarBanner();
  },

  /* Recupera a última seção visitada, ignorando valor inválido no armazenamento. */
  lerSecaoSalva() {
    try {
      const salva = localStorage.getItem(CHAVE_SECAO);
      return this.state.dados[salva] ? salva : "companies";
    } catch (e) {
      void e;
      return "companies";
    }
  },

  definirAno() {
    if (this.el.ano) this.el.ano.textContent = new Date().getFullYear();
  },

  /* O texto auxiliar do card: localização nas empresas, foco nas outras seções. */
  detalheDe(item) {
    return item.location || item.duration || "—";
  },

  /* Desenha a grade a partir do estado corrente, respeitando a paginação. */
  render() {
    const dados = this.state.filtrados;
    const secao = this.secoes[this.state.secaoAtual];

    this.el.container.innerHTML = "";

    if (dados.length === 0) {
      this.el.container.innerHTML = `<p class="end-message">Nenhuma ${secao.singular} encontrada para sua busca.</p>`;
      this.atualizarContador(0, 0);
      this.el.verMais.hidden = true;
      this.el.fim.hidden = true;
      return;
    }

    const fragmento = document.createDocumentFragment();

    dados.slice(0, this.state.visiveis).forEach((item) => {
      const clone = this.el.template.content.cloneNode(true);
      const link = clone.querySelector(".card");
      const img = clone.querySelector("img");

      link.href = item.site_url || "#";
      link.setAttribute("aria-label", `${secao.acao}: ${item.title} — abre em nova aba`);

      img.src = item.thumb || "./assets/logo/logo-career.png";
      img.alt = `Logo de ${item.title}`;
      img.addEventListener(
        "error",
        () => {
          img.src = "./assets/logo/logo-career.png";
        },
        { once: true }
      );

      clone.querySelector(".title").textContent = item.title || "Sem título";
      clone.querySelector(".text--medium").textContent = this.detalheDe(item);
      clone.querySelector(".badge").textContent = item.category || "Geral";
      clone.querySelector(".visit-label").textContent = secao.acao;

      fragmento.appendChild(clone);
    });

    this.el.container.appendChild(fragmento);

    const exibidos = Math.min(this.state.visiveis, dados.length);
    this.atualizarContador(exibidos, dados.length);

    const acabou = exibidos >= dados.length;
    this.el.verMais.hidden = acabou;
    this.el.fim.hidden = !acabou;
  },

  atualizarContador(exibidos, total) {
    const secao = this.secoes[this.state.secaoAtual];
    const rotulo = total === 1 ? secao.singular : secao.rotulo;
    this.el.contador.textContent = total === 0 ? `0 ${secao.rotulo}` : `${exibidos} ${rotulo} de ${total}`;
  },

  /* Troca a seção zerando busca e paginação, e guarda a escolha. */
  trocarSecao(nome, inicial = false) {
    if (!this.state.dados[nome]) return;
    if (!inicial && this.state.secaoAtual === nome) return;

    this.state.secaoAtual = nome;
    this.state.visiveis = 8;

    try {
      localStorage.setItem(CHAVE_SECAO, nome);
    } catch (e) {
      void e;
    }

    this.el.navLinks.forEach((link) => {
      const ativo = link.id === `nav-${nome}`;
      link.classList.toggle("active", ativo);
      if (link.hasAttribute("aria-pressed")) link.setAttribute("aria-pressed", String(ativo));
    });

    const secao = this.secoes[nome];
    this.el.titulo.innerHTML = secao.titulo;
    this.el.subtitulo.textContent = secao.subtitulo;
    document.title = `Career | learnTECH`;

    this.el.busca.value = "";
    this.state.filtrados = this.state.dados[nome];
    this.render();
  },

  /* Filtra a seção corrente por título, categoria, detalhe e localização. */
  buscar(termo) {
    const alvo = normalizar(termo).trim();
    const origem = this.state.dados[this.state.secaoAtual];
    this.state.visiveis = 8;

    this.state.filtrados = alvo
      ? origem.filter((item) =>
          normalizar(
            `${item.title} ${item.category} ${item.location || ""} ${item.duration || ""}`
          ).includes(alvo)
        )
      : origem;

    this.render();
  },

  sincronizarIconeTema() {
    const tema = document.documentElement.getAttribute("data-theme");
    if (this.el.iconeTema) {
      this.el.iconeTema.className = tema === "dark" ? "bx bx-sun" : "bx bx-moon";
    }
  },

  /* Monta o carrossel de destaques e cuida da rotação automática. */
  iniciarBanner() {
    const destaques = launchBanner.filter((item) => item && item.title);
    if (!this.el.bannerTrack || destaques.length === 0) {
      document.querySelector("#launch-banner")?.setAttribute("hidden", "");
      return;
    }

    const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let atual = 0;
    let temporizador = null;

    this.el.bannerTrack.innerHTML = destaques
      .map(
        (item, i) => `
      <article class="banner-slide ${i === 0 ? "active" : ""}" data-index="${i}">
        <div class="banner-slide-image">
          <img src="${escapar(item.thumb || "./assets/logo/logo-career.png")}" alt="" loading="lazy" />
        </div>
        <div class="banner-slide-content">
          <span class="banner-slide-badge">${escapar(item.badgeLabel)}</span>
          <h2 class="banner-slide-title">${escapar(item.title)}</h2>
          <p class="banner-slide-category">${escapar(item.category || "")}</p>
          <a class="visit-btn banner-slide-btn" href="${escapar(item.site_url || "#")}"
             target="_blank" rel="noopener noreferrer"
             aria-label="Conferir ${escapar(item.title)} — abre em nova aba">
            <span>Conferir</span>
            <i class="bx bx-right-top-arrow-circle" aria-hidden="true"></i>
          </a>
        </div>
      </article>`
      )
      .join("");

    this.el.bannerDots.innerHTML = destaques
      .map(
        (item, i) => `
      <button type="button" class="banner-dot ${i === 0 ? "active" : ""}" data-index="${i}"
        aria-label="Ir para o destaque ${i + 1}: ${escapar(item.title)}"></button>`
      )
      .join("");

    const slides = this.el.bannerTrack.querySelectorAll(".banner-slide");
    const dots = this.el.bannerDots.querySelectorAll(".banner-dot");

    const irPara = (i) => {
      slides[atual]?.classList.remove("active");
      dots[atual]?.classList.remove("active");
      atual = i;
      slides[atual]?.classList.add("active");
      dots[atual]?.classList.add("active");
    };

    const parar = () => {
      if (temporizador) clearInterval(temporizador);
      temporizador = null;
    };

    const rodar = () => {
      if (semMovimento || destaques.length < 2) return;
      parar();
      temporizador = setInterval(() => irPara((atual + 1) % destaques.length), 6000);
    };

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        irPara(Number(dot.dataset.index));
        rodar();
      });
    });

    this.el.bannerTrack.addEventListener("mouseenter", parar);
    this.el.bannerTrack.addEventListener("mouseleave", rodar);
    this.el.bannerTrack.addEventListener("focusin", parar);
    this.el.bannerTrack.addEventListener("focusout", rodar);
    document.addEventListener("visibilitychange", () => (document.hidden ? parar() : rodar()));

    rodar();
  },

  /* Liga todos os ouvintes de evento da página. */
  ligarEventos() {
    let atraso;
    this.el.busca.addEventListener("input", (evento) => {
      clearTimeout(atraso);
      const valor = evento.target.value;
      atraso = setTimeout(() => this.buscar(valor), 300);
    });

    this.el.verMais?.addEventListener("click", () => {
      this.state.visiveis += this.state.lote;
      this.render();
    });

    this.el.navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        this.trocarSecao(link.id.replace("nav-", ""));
        if (window.innerWidth <= 768) {
          this.el.menu?.classList.remove("open");
          this.el.menuToggle?.setAttribute("aria-expanded", "false");
        }
      });
    });

    this.el.botaoTema?.addEventListener("click", () => {
      const raiz = document.documentElement;
      const novo = raiz.getAttribute("data-theme") === "dark" ? "light" : "dark";
      raiz.setAttribute("data-theme", novo);
      try {
        localStorage.setItem(CHAVE_TEMA, novo);
      } catch (e) {
        void e;
      }
      this.sincronizarIconeTema();
    });

    this.el.menuToggle?.addEventListener("click", () => {
      const aberto = this.el.menu.classList.toggle("open");
      this.el.menuToggle.setAttribute("aria-expanded", String(aberto));
    });
  },
};

App.init();

/* Fim de main.js */
