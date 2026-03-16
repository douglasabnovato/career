/**
 * main.js - Engine do Portal Career
 * Orquestra: State Management, Renderização e Busca Global.
 */

// 1. Importação dos Módulos de Dados  
import { companies } from './js/good-companies.js'; // Adicione /js/
import { jobs } from './js/jobs.js';              // Adicione /js/
import { profiles } from './js/perfis-dev.js';    // Adicione /js/

const App = {
  // Estado Centralizado
  state: {
    currentBU: localStorage.getItem("activeBU") || "companies",
    allData: { companies, jobs, profiles },
    filteredData: [],
  },

  // Mapeamento do DOM
  el: {
    container: document.querySelector("#box-projects"),
    template: document.querySelector("#card-template"),
    searchInput: document.querySelector("#search-input"),
    navLinks: document.querySelectorAll(".nav-link"),
    sectionTitle: document.querySelector("#section-title"),
    sectionSubtitle: document.querySelector("#section-subtitle"),
    itemsCounter: document.querySelector("#items-counter"),
    yearSpan: document.querySelector("#year"),
  },

  init() {
    this.setYear();
    this.setupEventListeners();
    // Inicializa na BU salva ou na padrão
    this.switchBU(this.state.currentBU);
  },

  setYear() {
    if (this.el.yearSpan)
      this.el.yearSpan.textContent = new Date().getFullYear();
  },

  /**
   * Renderização de Alta Performance
   * Usa DocumentFragment para evitar múltiplos repaints no browser.
   */
  render() {
    const fragment = document.createDocumentFragment();
    const data = this.state.filteredData;

    this.el.container.innerHTML = "";

    data.forEach((item) => {
      const clone = this.el.template.content.cloneNode(true);

      // População dinâmica com fallback para caminhos de imagem
      const img = clone.querySelector("img");
      img.src = item.thumb.replace("../files/", "./assets/");
      img.alt = `Logo ${item.title}`;

      clone.querySelector(".title").textContent = item.title;

      // Lógica para adaptar o conteúdo ao tipo de dado
      const infoText = item.location || item.duration || "Remoto";
      clone.querySelector(".text--medium").textContent = infoText;
      clone.querySelector(".badge").textContent = item.category;

      const btn = clone.querySelector(".visit-btn");
      // Muda o texto do botão baseado na BU
      const btnLabel =
        this.state.currentBU === "profiles" ? "Ver Perfil" : "Ver Oportunidade";
      btn.querySelector("span").textContent = btnLabel;

      btn.addEventListener("click", () => window.open(item.site_url, "_blank"));

      fragment.appendChild(clone);
    });

    this.el.container.appendChild(fragment);
    this.updateCounter(data.length);
  },

  updateCounter(count) {
    const labels = {
      companies: "empresas encontradas",
      jobs: "plataformas de vagas",
      profiles: "perfis de mentores",
    };
    this.el.itemsCounter.textContent = `${count} ${labels[this.state.currentBU]}`;
  },

  /**
   * Gerenciador de Troca de Contexto (BU)
   */
  switchBU(buName) {
    this.state.currentBU = buName;
    localStorage.setItem("activeBU", buName);

    // UI: Links ativos
    this.el.navLinks.forEach((link) => {
      link.classList.toggle("active", link.id === `nav-${buName}`);
    });

    // UI: Textos Dinâmicos
    const contentMap = {
      companies: {
        title: 'Good <span class="highlight">Companies</span>',
        subtitle: "Empresas com cultura sólida e oportunidades desafiadoras.",
      },
      jobs: {
        title: 'Plataformas <span class="highlight">Jobs</span>',
        subtitle: "Os melhores lugares para buscar sua próxima vaga tech.",
      },
      profiles: {
        title: 'Dev <span class="highlight">Profiles</span>',
        subtitle: "Referências e mentores que inspiram a comunidade.",
      },
    };

    this.el.sectionTitle.innerHTML = contentMap[buName].title;
    this.el.sectionSubtitle.textContent = contentMap[buName].subtitle;

    // Reset da Busca e Renderização
    this.el.searchInput.value = "";
    this.state.filteredData = this.state.allData[buName];
    this.render();
  },

  setupEventListeners() {
    // Busca com Debounce (espera 300ms após o último clique)
    let timer;
    this.el.searchInput.addEventListener("input", (e) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const term = e.target.value.toLowerCase();
        const currentSource = this.state.allData[this.state.currentBU];

        this.state.filteredData = currentSource.filter(
          (item) =>
            item.title.toLowerCase().includes(term) ||
            item.category.toLowerCase().includes(term),
        );
        this.render();
      }, 300);
    });

    // Clique na Navegação
    this.el.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const bu = link.id.replace("nav-", "");
        this.switchBU(bu);
      });
    });

    // Tema Dark/Light
    const themeBtn = document.querySelector("#theme-toggle");
    themeBtn.addEventListener("click", () => {
      const html = document.documentElement;
      const isDark = html.getAttribute("data-theme") === "dark";
      const newTheme = isDark ? "light" : "dark";

      html.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    });
  },
};

document.addEventListener("DOMContentLoaded", () => App.init());
