/**
 * main.js - Engine do Portal Career
 * Orquestra: State Management, Renderização, Busca e Paginação.
 */

import { companies } from "./js/good-companies.js";
import { jobs } from "./js/jobs.js";
import { profiles } from "./js/perfis-dev.js";

const App = {
  // 1. ESTADO CENTRALIZADO
  state: {
    currentBU: localStorage.getItem("activeBU") || "companies",
    allData: { companies, jobs, profiles },
    filteredData: [],
    // Controle de Paginação
    visibleCount: 8,
    batchSize: 6,
  },

  // 2. MAPEAMENTO DE ELEMENTOS DO DOM
  el: {
    container: document.querySelector("#box-projects"),
    template: document.querySelector("#card-template"),
    searchInput: document.querySelector("#search-input"),
    navLinks: document.querySelectorAll(".nav-link"),
    sectionTitle: document.querySelector("#section-title"),
    sectionSubtitle: document.querySelector("#section-subtitle"),
    itemsCounter: document.querySelector("#items-counter"),
    yearSpan: document.querySelector("#year"),
    themeIcon: document.querySelector("#theme-icon"),
    menuToggle: document.querySelector("#menu-toggle"),
    headerMenu: document.querySelector("#header-menu"),
    // Botão Carregar Mais
    loadMoreBtn: document.querySelector("#load-more"),
  },

  // 3. INICIALIZAÇÃO
  init() {
    this.setYear();
    this.syncThemeIcon();
    this.setupEventListeners();
    this.switchBU(this.state.currentBU);
  },

  setYear() {
    if (this.el.yearSpan)
      this.el.yearSpan.textContent = new Date().getFullYear();
  },

  resolveImagePath(path) {
    if (!path) return "./assets/logo/logo-career.png";
    const folderMap = {
      companies: "thumb_good-companies",
      jobs: "thumb_jobs",
      profiles: "thumb_perfis-dev",
    };
    if (path.includes("../files/")) {
      const fileName = path.split("/").pop();
      return `./assets/${folderMap[this.state.currentBU]}/${fileName}`;
    }
    return path;
  },

  // 4. RENDERIZAÇÃO COM LÓGICA DE PAGINAÇÃO
  render() {
    const fragment = document.createDocumentFragment();
    const data = this.state.filteredData;

    // Fatiamos os dados conforme o limite de visibilidade atual
    const itemsToRender = data.slice(0, this.state.visibleCount);

    this.el.container.innerHTML = "";

    if (data.length === 0) {
      this.el.container.innerHTML =
        '<p class="end-message">Nenhum resultado encontrado para sua busca.</p>';
      this.toggleLoadMore(false);
      return;
    }

    itemsToRender.forEach((item) => {
      const clone = this.el.template.content.cloneNode(true);
      const img = clone.querySelector("img");
      img.src = this.resolveImagePath(item.thumb);
      img.onerror = () => (img.src = "./assets/logo/logo-career.png");

      clone.querySelector(".title").textContent = item.title || "Sem título";
      clone.querySelector(".text--medium").textContent =
        item.location || item.duration || item.company || "Remoto";
      clone.querySelector(".badge").textContent = item.category || "Geral";

      const btn = clone.querySelector(".visit-btn");
      btn.querySelector("span").textContent =
        this.state.currentBU === "profiles" ? "Ver Perfil" : "Ver Oportunidade";

      const targetUrl = item.site_url || item.url || "#";
      btn.onclick = () => window.open(targetUrl, "_blank");

      fragment.appendChild(clone);
    });

    this.el.container.appendChild(fragment);
    this.updateCounter(this.state.visibleCount, data.length);

    // Gerencia o botão Carregar Mais
    this.toggleLoadMore(this.state.visibleCount < data.length);
  },

  toggleLoadMore(show) {
    if (!this.el.loadMoreBtn) return;

    if (show) {
      this.el.loadMoreBtn.style.display = "inline-flex";
      this.el.loadMoreBtn.disabled = false;
      this.el.loadMoreBtn.querySelector("span").textContent = "Carregar Mais";
    } else {
      // Se há dados mas chegamos ao fim, mostra mensagem final
      if (this.state.filteredData.length > 0) {
        this.el.loadMoreBtn.style.display = "inline-flex";
        this.el.loadMoreBtn.disabled = true;
        this.el.loadMoreBtn.querySelector("span").textContent =
          "Não há mais o que carregar";
      } else {
        this.el.loadMoreBtn.style.display = "none";
      }
    }
  },

  updateCounter(visibleCount, totalCount) {
    const labels = {
      companies: "empresas",
      jobs: "plataformas",
      profiles: "devs",
    };

    const label = labels[this.state.currentBU];

    // Se não houver resultados (na busca por exemplo)
    if (totalCount === 0) {
      this.el.itemsCounter.textContent = `0 ${label}`;
      return;
    }

    // Se o visível for maior que o total (proteção lógica), igualamos
    const currentVisible =
      visibleCount > totalCount ? totalCount : visibleCount;

    this.el.itemsCounter.textContent = `${currentVisible} ${label} de ${totalCount}`;
  },

  switchBU(buName) {
    if (!this.state.allData[buName]) return;

    // Reset de paginação ao trocar categoria
    this.state.visibleCount = 8;
    this.state.currentBU = buName;
    localStorage.setItem("activeBU", buName);

    this.el.navLinks.forEach((link) => {
      link.classList.toggle("active", link.id === `nav-${buName}`);
    });

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

    this.el.searchInput.value = "";
    this.state.filteredData = this.state.allData[buName];
    this.render();
  },

  syncThemeIcon() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    if (this.el.themeIcon) {
      this.el.themeIcon.className =
        currentTheme === "dark" ? "bx bx-sun" : "bx bx-moon";
    }
  },

  setupEventListeners() {
    let timer;
    this.el.searchInput.addEventListener("input", (e) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const term = e.target.value.toLowerCase();
        const currentSource = this.state.allData[this.state.currentBU];

        // Reset da contagem na busca
        this.state.visibleCount = 8;

        this.state.filteredData = currentSource.filter(
          (item) =>
            item.title?.toLowerCase().includes(term) ||
            item.category?.toLowerCase().includes(term) ||
            item.location?.toLowerCase().includes(term),
        );
        this.render();
      }, 300);
    });

    // Clique no botão Carregar Mais
    this.el.loadMoreBtn?.addEventListener("click", () => {
      this.state.visibleCount += this.state.batchSize;
      this.render();
    });

    this.el.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const bu = link.id.replace("nav-", "");
        this.switchBU(bu);
        if (window.innerWidth <= 768) {
          this.el.headerMenu?.classList.remove("open");
          this.el.menuToggle?.setAttribute("aria-expanded", "false");
        }
      });
    });

    const themeBtn = document.querySelector("#theme-toggle");
    themeBtn?.addEventListener("click", () => {
      const html = document.documentElement;
      const isDark = html.getAttribute("data-theme") === "dark";
      const newTheme = isDark ? "light" : "dark";
      html.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      this.syncThemeIcon();
    });

    this.el.menuToggle?.addEventListener("click", () => {
      const isOpen = this.el.headerMenu.classList.toggle("open");
      this.el.menuToggle.setAttribute("aria-expanded", isOpen);
    });
  },
};

document.addEventListener("DOMContentLoaded", () => App.init());
