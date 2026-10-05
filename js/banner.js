/* banner.js — carrossel de destaques do topo: monta os slides, os dots e cuida da rotação automática. */

import { escapar } from "./utils.js";

/* Monta o carrossel a partir da lista de destaques e liga rotação, dots, pausa ao focar/passar o mouse. */
export function iniciarBanner({ bannerTrack, bannerDots, destaques }) {
  if (!bannerTrack || !destaques || destaques.length === 0) {
    document.querySelector("#launch-banner")?.setAttribute("hidden", "");
    return;
  }

  const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let atual = 0;
  let temporizador = null;

  bannerTrack.innerHTML = destaques
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

  bannerDots.innerHTML = destaques
    .map(
      (item, i) => `
    <button type="button" class="banner-dot ${i === 0 ? "active" : ""}" data-index="${i}"
      aria-label="Ir para o destaque ${i + 1}: ${escapar(item.title)}"></button>`
    )
    .join("");

  const slides = bannerTrack.querySelectorAll(".banner-slide");
  const dots = bannerDots.querySelectorAll(".banner-dot");

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

  bannerTrack.addEventListener("mouseenter", parar);
  bannerTrack.addEventListener("mouseleave", rodar);
  bannerTrack.addEventListener("focusin", parar);
  bannerTrack.addEventListener("focusout", rodar);
  document.addEventListener("visibilitychange", () => (document.hidden ? parar() : rodar()));

  rodar();
}

/* Fim de banner.js */