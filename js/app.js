/* app.js — estado, renderização, busca, paginação e navegação entre seções do Career. */

import { companies } from "./good-companies.js";
import { jobs } from "./jobs.js";
import { profiles } from "./perfis-dev.js";
import { launchBanner, montarDestaques } from "./banner-data.js";
import { normalizar } from "./utils.js";
import { iniciarBanner } from "./banner.js";
import { inicializarTema } from "./theme.js";

const CHAVE_SECAO = "career:secao";

export const App = {
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
      titulo: 'Empresas <span class="highlight">Legais</span>',
      subtitulo:
        "Me contaram que essas empresas eram legais para trabalhar, tinham cultura sólida e oportunidades desafiadoras",
      rotulo: "empresas",
      singular: "empresa",
      acao: "Ver Empresa",
    },
    jobs: {
      titulo: 'Plataformas de <span class="highlight">Vaga</span>',
      subtitulo: "Os melhores lugares para buscar sua próxima vaga tech.",
      rotulo: "plataformas",
      singular: "plataforma",
      acao: "Ver Oportunidade",
    },
    profiles: {
      titulo: 'Perfis de <span class="highlight">Dev</span>',
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
    inicializarTema({
      iconeTema: this.el.iconeTema,
      botaoTema: this.el.botaoTema,
    });
    this.ligarEventos();
    this.trocarSecao(this.state.secaoAtual, true);
    iniciarBanner({
      bannerTrack: this.el.bannerTrack,
      bannerDots: this.el.bannerDots,
      destaques: (this.destaques || launchBanner).filter(
        (item) => item && item.title,
      ),
    });
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

      if (this.state.secaoAtual === "companies" && item.id === "brq") {
        link.href = "#";
        link.dataset.companyId = item.id;
        link.setAttribute(
          "aria-label",
          `Ver detalhes da empresa: ${item.title}`,
        );
      } else {
        if (this.state.secaoAtual === "companies" && item.id === "brq") {
          link.href = "#";
          link.dataset.companyId = item.id;
          link.setAttribute(
            "aria-label",
            `Ver detalhes da empresa: ${item.title}`,
          );
        } else {
          if (this.state.secaoAtual === "companies" && item.id === "brq") {
            link.href = "#";
            link.dataset.companyId = item.id;
            link.setAttribute(
              "aria-label",
              `Ver detalhes da empresa: ${item.title}`,
            );
          } else {
            if (this.state.secaoAtual === "companies" && item.id === "brq") {
              link.href = "#";
              link.dataset.companyId = item.id;
              link.setAttribute(
                "aria-label",
                `Ver detalhes da empresa: ${item.title}`,
              );
            } else {
              link.href = item.site_url || "#";
              link.setAttribute(
                "aria-label",
                `${secao.acao}: ${item.title} — abre em nova aba`,
              );
            }
          }
        }
      }

      img.src = item.thumb || "./assets/logo/logo-career.png";
      img.alt = `Logo de ${item.title}`;
      img.addEventListener(
        "error",
        () => {
          img.src = "./assets/logo/logo-career.png";
        },
        { once: true },
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
    this.el.contador.textContent =
      total === 0 ? `0 ${secao.rotulo}` : `${exibidos} ${rotulo} de ${total}`;
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
      if (link.hasAttribute("aria-pressed"))
        link.setAttribute("aria-pressed", String(ativo));
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
            `${item.title} ${item.category} ${item.location || ""} ${item.duration || ""}`,
          ).includes(alvo),
        )
      : origem;

    this.render();
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

    this.el.menuToggle?.addEventListener("click", () => {
      const aberto = this.el.menu.classList.toggle("open");
      this.el.menuToggle.setAttribute("aria-expanded", String(aberto));
    });
  },

  /* Troca o catálogo do estado pelo da API e recalcula os destaques. */
  usarCatalogo(cat) {
    this.state.dados = {
      companies: cat.companies,
      jobs: cat.jobs,
      profiles: cat.profiles,
    };
    this.destaques = montarDestaques(this.state.dados, cat.destaques);
  },
};

/* Fim de app.js */
