import { companies } from "./good-companies.js";
import { companyOpportunities } from "./company-opportunities.js";

const modal = document.querySelector("#company-modal");

const modalThumb = document.querySelector("#company-modal-thumb");

const modalTitle = document.querySelector("#company-modal-title");

const modalCategory = document.querySelector("#company-modal-category");

const modalLocation = document.querySelector("#company-modal-location");

const modalAbout = document.querySelector("#company-modal-about");

const modalDescription = document.querySelector("#company-modal-description");

const modalAreas = document.querySelector("#company-modal-areas");

const modalWorkModel = document.querySelector("#company-modal-work-model");

const modalCulture = document.querySelector("#company-modal-culture");

const modalDevelopment = document.querySelector("#company-modal-development");

const modalOpportunities = document.querySelector(
  "#company-modal-opportunities",
);

const modalCareer = document.querySelector("#company-modal-career");

const modalSite = document.querySelector("#company-modal-site");

function createList(items = []) {
  return items.map((item) => `<li>${item}</li>`).join("");
}

function createTags(items = []) {
  return items
    .map(
      (item) => `
      <span class="company-modal__tag">
        ${item}
      </span>
    `,
    )
    .join("");
}

function createOpportunity(opportunity) {
  return `
    <article class="opportunity">

      <button
        class="opportunity__trigger"
        type="button"
        aria-expanded="false"
      >

        <span>

          <span class="opportunity__title">
            ${opportunity.title}
          </span>

          <span class="opportunity__meta">
            ${opportunity.location}
            •
            ${opportunity.work_model}
          </span>

        </span>

        <span
          class="opportunity__icon"
          aria-hidden="true"
        >
          +
        </span>

      </button>


      <div class="opportunity__content">

        <p>
          ${opportunity.description}
        </p>


        <h4>Resumo</h4>

        <p>
          ${opportunity.summary}
        </p>


        <h4>Tecnologias</h4>

        <div class="company-modal__tags">
          ${createTags(opportunity.technologies)}
        </div>


        <h4>Requisitos</h4>

        <ul>
          ${createList(opportunity.requirements)}
        </ul>


        <h4>Diferenciais</h4>

        <ul>
          ${createList(opportunity.differentials)}
        </ul>


        <a
          class="opportunity__link"
          href="${opportunity.url}"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver oportunidade original
        </a>

      </div>

    </article>
  `;
}

function renderOpportunities(companyId) {
  const opportunities = companyOpportunities.filter(
    (opportunity) => opportunity.company_id === companyId,
  );

  modalOpportunities.innerHTML = opportunities.length
    ? opportunities.map(createOpportunity).join("")
    : "<p>Nenhuma oportunidade cadastrada.</p>";
}

function openCompanyModal(companyId) {
  const company = companies.find((company) => company.id === companyId);

  if (!company) {
    console.error(`Empresa não encontrada: ${companyId}`);

    return;
  }
 
  modalThumb.src = company.modal_thumb || company.thumb;

  modalThumb.alt = `Logo da ${company.title}`;

  modalTitle.textContent = company.title;

  modalCategory.textContent = company.category;

  modalLocation.textContent = company.location;

  modalAbout.textContent = company.about;

  modalDescription.textContent = company.description;

  modalAreas.innerHTML = createTags(company.areas);

  modalWorkModel.textContent = company.work_model;

  modalCulture.innerHTML = createList(company.culture);

  modalDevelopment.innerHTML = createList(company.development);

  modalCareer.href = company.career_url;

  modalSite.href = company.site_url;

  renderOpportunities(company.id);

  modal.classList.add("is-open");

  modal.setAttribute("aria-hidden", "false");

  document.body.classList.add("modal-open");

  modal.querySelector(".company-modal__close")?.focus();
}

function closeCompanyModal() {
  modal.classList.remove("is-open");

  modal.setAttribute("aria-hidden", "true");

  document.body.classList.remove("modal-open");
}

/* Fechar */

modal.addEventListener("click", (event) => {
  if (event.target.matches("[data-modal-close]")) {
    closeCompanyModal();
  }
});

/* ESC */

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("is-open")) {
    closeCompanyModal();
  }
});

/* Accordion */

modalOpportunities.addEventListener("click", (event) => {
  const trigger = event.target.closest(".opportunity__trigger");

  if (!trigger) {
    return;
  }

  const opportunity = trigger.closest(".opportunity");

  const isOpen = opportunity.classList.contains("is-open");

  modal.querySelectorAll(".opportunity.is-open").forEach((item) => {
    item.classList.remove("is-open");

    item
      .querySelector(".opportunity__trigger")
      .setAttribute("aria-expanded", "false");
  });

  if (!isOpen) {
    opportunity.classList.add("is-open");

    trigger.setAttribute("aria-expanded", "true");
  }
});

/* Clique no card */

document.addEventListener("click", event => {
  const card = event.target.closest("[data-company-id]");

  if (!card) {
    return;
  }

  event.preventDefault();

  openCompanyModal(card.dataset.companyId);
});

export { openCompanyModal, closeCompanyModal };
