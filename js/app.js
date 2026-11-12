/* app.js — estado, renderização, busca, paginação e navegação entre seções do Career. */

import { companies } from "./good-companies.js";
import { jobs } from "./jobs.js";
import { profiles } from "./perfis-dev.js";
import { curriculos } from "./curriculos.js";
import { launchBanner, montarDestaques } from "./banner-data.js";
import { normalizar, urlSegura } from "./utils.js";
import { iniciarBanner } from "./banner.js";
import { inicializarTema } from "./theme.js";
import { renderCurriculos, iniciarAccordionCurriculos, abrirModelo } from "./curriculos-render.js";
import {
  lerFiltroDaUrl,
  lerModeloDaUrl,
  escreverFiltroNaUrl,
  categoriaDe,
  categoriasDe,
  casarCategoria,
  SECOES_COM_CATEGORIA,
} from "./filtro-url.js";

const CHAVE_SECAO = "career:secao";

/* Tipo usado na URL da página de detalhe para cada seção de cards. */
const TIPO_DETALHE = { companies: "empresas", jobs: "vagas", profiles: "perfis" };

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

    /* Categoria escolhida no filtro da seção atual ("" = todas). */
    categoria: "",

    visiveis: 8,
    lote: 6,
  },

  el: {
    container: document.querySelector("#box-projects"),
    template: document.querySelector("#card-template"),
    busca: document.querySelector("#search-input"),
    filtroCategoria: document.querySelector("#category-filter"),
    caixaFiltro: document.querySelector("#category-filter-box"),
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
      subtitulo: "Me contaram que essas empresas eram legais para trabalhar, tinham cultura sólida e oportunidades desafiadoras",
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
      subtitulo: "Explore diferentes modelos de currículos e referências para apresentar sua experiência profissional.",
      rotulo: "currículos",
      singular: "currículo",
      acao: "Ver Currículo",
    },
  },

  init() {
    /* Um link com ?secao=&categoria= tem prioridade sobre a seção salva no navegador. */
    const daUrl = lerFiltroDaUrl(globalThis.location?.search);

    /* ?modelo=<slug> abre um modelo de currículo direto (career#29); sem seção na URL, ele leva aos currículos. */
    this.state.modeloPedido = lerModeloDaUrl(globalThis.location?.search);

    this.state.secaoAtual = daUrl.secao || (this.state.modeloPedido ? "curriculos" : this.lerSecaoSalva());

    this.definirAno();

    inicializarTema({
      iconeTema: this.el.iconeTema,
      botaoTema: this.el.botaoTema,
    });

    this.ligarEventos();

    this.trocarSecao(this.state.secaoAtual, true, daUrl.categoria);

    iniciarBanner({
      bannerTrack: this.el.bannerTrack,
      bannerDots: this.el.bannerDots,
      destaques: (this.destaques || launchBanner).filter((item) => item && item.title),
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

    /* Modelo de currículo aberto antes de redesenhar (o catálogo da API pode chegar depois): continua aberto. */
    const abertoAntes = this.el.container.querySelector(".resume-item.is-open")?.dataset.slug;

    this.el.container.innerHTML = "";

    if (!dados || dados.length === 0) {
      this.renderVazio(secao);

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
      /* O modelo do link direto entra na parte visível da lista, mesmo que esteja depois do primeiro lote. */
      const pedido = this.state.modeloPedido ? dados.findIndex((c) => c.slug === this.state.modeloPedido) : -1;

      if (pedido >= this.state.visiveis) this.state.visiveis = pedido + 1;

      renderCurriculos({
        container: this.el.container,
        template: this.el.curriculoTemplate,
        dados,
        visiveis: this.state.visiveis,
      });

      /* Abre uma vez só; se o modelo ainda não chegou (só na API), tenta de novo quando o catálogo remoto carregar. */
      if (pedido >= 0 && abrirModelo(this.el.container, this.state.modeloPedido)) this.state.modeloPedido = "";
      else if (abertoAntes) abrirModelo(this.el.container, abertoAntes, { rolar: false });

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

      if (item.slug && item.detalhe && TIPO_DETALHE[this.state.secaoAtual]) {
        /* Item com página de detalhe: abre detalhe.html na mesma aba. */
        link.href = `detalhe.html?tipo=${TIPO_DETALHE[this.state.secaoAtual]}&id=${encodeURIComponent(item.slug)}`; /* "?" é o formato do sitemap.xml e é rastreável; o serve.json evita que o "npx serve" descarte a query. */

        link.removeAttribute("target");

        link.removeAttribute("rel");
      } else {
        link.href = urlSegura(item.site_url) || "#"; /* só https:, http:, mailto: ou caminho relativo */

        /* O nome acessível é o próprio texto do card; o aviso de nova aba vai num texto só para leitor de tela. */
        const aviso = document.createElement("span");

        aviso.className = "sr-only";

        aviso.textContent = " (abre em nova aba)";

        link.appendChild(aviso);
      }

      img.src = item.thumb || "./assets/logo/logo-career.png";

      img.alt = ""; /* decorativa: o título do card já diz o nome */

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

    this.el.contador.textContent = total === 0 ? `0 ${secao.rotulo}` : `${exibidos} ${rotulo} de ${total}`;
  },

  trocarSecao(nome, inicial = false, categoria = "") {
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

    /* Troca de seção zera a categoria; na abertura da página, ela pode vir do link. */
    this.state.categoria = categoria;

    this.listaDoFiltro = null;

    this.aplicarFiltros("");

    this.atualizarUrl();
  },

  /*
   * Monta as opções do filtro de categoria da seção atual.
   * Só refaz quando a lista de dados muda (troca de seção ou catálogo da API).
   */
  montarFiltro() {
    const origem = this.state.dados[this.state.secaoAtual];

    const temCategoria = SECOES_COM_CATEGORIA.includes(this.state.secaoAtual);

    if (this.el.caixaFiltro) this.el.caixaFiltro.hidden = !temCategoria;

    if (!temCategoria) {
      this.state.categoria = "";

      return;
    }

    const categorias = categoriasDe(origem);

    /* Categoria do link que não existe na seção é ignorada. */
    this.state.categoria = casarCategoria(categorias, this.state.categoria);

    if (!this.el.filtroCategoria || this.listaDoFiltro === origem) {
      if (this.el.filtroCategoria) this.el.filtroCategoria.value = this.state.categoria;

      return;
    }

    this.listaDoFiltro = origem;

    const opcoes = [new Option("Todas", "")];

    categorias.forEach((c) => opcoes.push(new Option(c, c)));

    this.el.filtroCategoria.replaceChildren(...opcoes);

    this.el.filtroCategoria.value = this.state.categoria;
  },

  /* Aplica busca e categoria juntas sobre os dados da seção atual. */
  aplicarFiltros(termo) {
    this.montarFiltro();

    const alvo = normalizar(termo).trim();

    const origem = this.state.dados[this.state.secaoAtual];

    const categoria = normalizar(this.state.categoria);

    this.state.filtrados = origem.filter((item) => {
      if (categoria && normalizar(categoriaDe(item)) !== categoria) return false;

      if (!alvo) return true;

      /* Busca específica para currículos. */
      if (this.state.secaoAtual === "curriculos") {
        const texto = [item.nome, item.titulo, item.localizacao, item.objetivo, item.resumo].filter(Boolean).join(" ");

        return normalizar(texto).includes(alvo);
      }

      /* Busca tradicional para empresas, vagas e perfis. */
      return normalizar(`${item.title || ""} ${item.category || ""} ${item.location || ""} ${item.duration || ""}`).includes(alvo);
    });

    this.render();
  },

  buscar(termo) {
    this.state.visiveis = 8;

    this.aplicarFiltros(termo);
  },

  definirCategoria(categoria) {
    this.state.categoria = categoria;

    this.state.visiveis = 8;

    this.aplicarFiltros(this.el.busca.value);

    this.atualizarUrl();
  },

  limparFiltros() {
    this.el.busca.value = "";

    this.definirCategoria("");

    this.el.busca.focus();
  },

  /* Grava seção e categoria na URL sem criar entrada no histórico, para o link poder ser compartilhado. */
  atualizarUrl() {
    try {
      const query = escreverFiltroNaUrl(location.search, { secao: this.state.secaoAtual, categoria: this.state.categoria });

      history.replaceState(history.state, "", `${location.pathname}${query}${location.hash}`);
    } catch (e) {
      void e;
    }
  },

  /* Estado vazio: mensagem e botão "Limpar filtros". */
  renderVazio(secao) {
    const caixa = document.createElement("div");

    caixa.className = "end-message empty-state";

    const texto = document.createElement("p");

    texto.textContent = `Nenhuma ${secao.singular} encontrada com estes filtros.`;

    const botao = document.createElement("button");

    botao.type = "button";

    botao.className = "visit-btn clear-filters-btn";

    botao.textContent = "Limpar filtros";

    botao.addEventListener("click", () => this.limparFiltros());

    caixa.append(texto, botao);

    this.el.container.replaceChildren(caixa);
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
     * Filtro por categoria.
     */
    this.el.filtroCategoria?.addEventListener("change", (evento) => this.definirCategoria(evento.target.value));

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
      /* Modelos de currículo da API; se essa lista falhar, mantém a cópia local gerada. */
      curriculos: cat.curriculos || curriculos,
    };

    /* Sem seleção de destaques válida na API, mantém o banner local (launchBanner). */
    this.destaques = cat.destaques && typeof cat.destaques === "object" ? montarDestaques(this.state.dados, cat.destaques) : null;
  },
};

/* Fim de app.js */
