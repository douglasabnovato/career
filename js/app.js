/* app.js — estado, renderização, busca, paginação e navegação entre seções do Career. */

import { companies } from "./good-companies.js";
import { jobs } from "./jobs.js";
import { profiles } from "./perfis-dev.js";
import { curriculos } from "./curriculos.js";
import { launchBanner, montarDestaques } from "./banner-data.js";
import { normalizar } from "./utils.js";
import { iniciarBanner } from "./banner.js";
import { inicializarTema } from "./theme.js";
import {
  renderCurriculos,
  iniciarAccordionCurriculos,
} from "./curriculos-render.js";

const CHAVE_SECAO = "career:secao";

export const App = {
  state: {
    secaoAtual: "companies",

    dados: {
      companies,
      jobs,
      profiles,
      curriculos,
    },

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
    curriculoTemplate: document.querySelector("#curriculo-template"),
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

    curriculos: {
      titulo: 'Modelos de <span class="highlight">Currículos</span>',
      subtitulo:
        "Explore diferentes modelos de currículos e referências para apresentar sua experiência profissional.",
      rotulo: "currículos",
      singular: "currículo",
      acao: "Ver Currículo",
    },
  },

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
    if (this.el.ano) {
      this.el.ano.textContent = new Date().getFullYear();
    }
  },

  detalheDe(item) {
    return item.location || item.duration || "—";
  },

  render() {
    const dados = this.state.filtrados;
    const secao = this.secoes[this.state.secaoAtual];

    this.el.container.innerHTML = "";

    if (!dados || dados.length === 0) {
      this.el.container.innerHTML = `
        <p class="end-message">
          Nenhuma ${secao.singular}
          encontrada para sua busca.
        </p>
      `;

      this.atualizarContador(0, 0);

      this.el.verMais.hidden = true;
      this.el.fim.hidden = true;

      return;
    }

    /*
     * Currículos possuem uma estrutura
     * diferente dos cards tradicionais.
     */
    if (this.state.secaoAtual === "curriculos") {
      renderCurriculos({
        container: this.el.container,
        template: this.el.curriculoTemplate,
        dados,
        visiveis: this.state.visiveis,
      });

      const exibidos = Math.min(this.state.visiveis, dados.length);

      this.atualizarContador(exibidos, dados.length);

      const acabou = exibidos >= dados.length;

      this.el.verMais.hidden = acabou;
      this.el.fim.hidden = !acabou;

      return;
    }

    /*
     * Empresas, vagas e perfis continuam
     * utilizando o card original.
     */
    const fragmento = document.createDocumentFragment();

    dados.slice(0, this.state.visiveis).forEach((item) => {
      const clone = this.el.template.content.cloneNode(true);

      const link = clone.querySelector(".card");

      const img = clone.querySelector("img");

      /*
       * BRQ abre o modal interno.
       */
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

  trocarSecao(nome, inicial = false) {
    /*
     * Impede navegação para uma seção
     * que não existe nos dados.
     */
    if (!this.state.dados[nome]) {
      console.warn(`Seção não encontrada: ${nome}`);
      return;
    }

    if (!inicial && this.state.secaoAtual === nome) {
      return;
    }

    this.state.secaoAtual = nome;
    this.state.visiveis = 8;

    try {
      localStorage.setItem(CHAVE_SECAO, nome);
    } catch (e) {
      void e;
    }

    /*
     * Atualiza estado visual dos botões.
     */
    this.el.navLinks.forEach((link) => {
      const ativo = link.id === `nav-${nome}`;

      link.classList.toggle("active", ativo);

      if (link.hasAttribute("aria-pressed")) {
        link.setAttribute("aria-pressed", String(ativo));
      }
    });

    const secao = this.secoes[nome];

    this.el.titulo.innerHTML = secao.titulo;

    this.el.subtitulo.textContent = secao.subtitulo;

    document.title = "Career | learnTECH";

    this.el.busca.value = "";

    this.state.filtrados = this.state.dados[nome];

    this.render();
  },

  buscar(termo) {
    const alvo = normalizar(termo).trim();

    const origem = this.state.dados[this.state.secaoAtual];

    this.state.visiveis = 8;

    if (!alvo) {
      this.state.filtrados = origem;

      this.render();

      return;
    }

    /*
     * Busca específica para currículos.
     */
    if (this.state.secaoAtual === "curriculos") {
      this.state.filtrados = origem.filter((curriculo) => {
        const texto = [
          curriculo.nome,
          curriculo.titulo,
          curriculo.localizacao,
          curriculo.objetivo,
          curriculo.resumo,
        ]
          .filter(Boolean)
          .join(" ");

        return normalizar(texto).includes(alvo);
      });

      this.render();

      return;
    }

    /*
     * Busca tradicional para empresas,
     * vagas e perfis.
     */
    this.state.filtrados = origem.filter((item) =>
      normalizar(
        `${item.title || ""} ${item.category || ""} ${item.location || ""} ${
          item.duration || ""
        }`,
      ).includes(alvo),
    );

    this.render();
  },

  ligarEventos() {
    let atraso;

    /*
     * Campo de busca.
     */
    this.el.busca.addEventListener("input", (evento) => {
      clearTimeout(atraso);

      const valor = evento.target.value;

      atraso = setTimeout(() => this.buscar(valor), 300);
    });

    /*
     * Botão "Ver mais".
     */
    this.el.verMais?.addEventListener("click", () => {
      this.state.visiveis += this.state.lote;

      this.render();
    });

    /*
     * Menu principal.
     */
    this.el.navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        const nome = link.id.replace("nav-", "");

        this.trocarSecao(nome);

        if (window.innerWidth <= 768) {
          this.el.menu?.classList.remove("open");

          this.el.menuToggle?.setAttribute("aria-expanded", "false");
        }
      });
    });

    /*
     * Menu mobile.
     */
    this.el.menuToggle?.addEventListener("click", () => {
      const aberto = this.el.menu.classList.toggle("open");

      this.el.menuToggle.setAttribute("aria-expanded", String(aberto));
    });

    /*
     * Accordion dos currículos.
     */
    iniciarAccordionCurriculos(this.el.container);
  },

  /*
   * Recebe o catálogo remoto sem apagar
   * os currículos locais.
   */
  usarCatalogo(cat) {
    this.state.dados = {
      companies: cat.companies,
      jobs: cat.jobs,
      profiles: cat.profiles,
      curriculos,
    };

    this.destaques = montarDestaques(this.state.dados, cat.destaques);
  },
};

/* Fim de app.js */
