import { escapar } from "./utils.js";

function criarLista(items = []) {
  return items.map((item) => `<li>${escapar(item)}</li>`).join("");
}

function criarTags(items = []) {
  return items
    .map(
      (item) => `
        <span class="resume-tag">
          ${escapar(item)}
        </span>
      `,
    )
    .join("");
}

function criarExperiencias(experiencias = []) {
  return experiencias
    .map(
      (experiencia) => `
        <article class="resume-experience__item">

          <h4 class="resume-experience__role">
            ${escapar(experiencia.cargo || "")}
          </h4>

          <p class="resume-experience__company">
            ${escapar(experiencia.empresa || "")}
          </p>

          <p class="resume-experience__meta">
            ${escapar(experiencia.periodo || "")}
            ${experiencia.local ? ` • ${escapar(experiencia.local)}` : ""}
            ${experiencia.modelo ? ` • ${escapar(experiencia.modelo)}` : ""}
          </p>

          ${
            experiencia.descricaoEmpresa
              ? `
                <p class="resume-experience__description">
                  ${escapar(experiencia.descricaoEmpresa)}
                </p>
              `
              : ""
          }

          ${
            experiencia.atividades?.length
              ? `
                <ul class="resume-section__list">
                  ${criarLista(experiencia.atividades)}
                </ul>
              `
              : ""
          }

          ${
            experiencia.tecnologias?.length
              ? `
                <div class="resume-tags">
                  ${criarTags(experiencia.tecnologias)}
                </div>
              `
              : ""
          }

        </article>
      `,
    )
    .join("");
}

function criarFormacao(formacao = []) {
  return formacao
    .map(
      (item) => `
        <article class="resume-education__item">

          <h4 class="resume-education__course">
            ${escapar(item.curso || "")}
          </h4>

          <p class="resume-education__institution">
            ${escapar(item.instituicao || "")}
          </p>

          <p class="resume-education__meta">
            ${escapar(item.periodo || "")}
            ${item.status ? ` • ${escapar(item.status)}` : ""}
          </p>

        </article>
      `,
    )
    .join("");
}

/* Dicas por seção e fontes públicas que embasam o modelo. */
function criarOrientacao(curriculo) {
  const dicas = (curriculo.dicas || [])
    .map((d) => `<li><strong>${escapar(d.secao || "")}:</strong> ${escapar(d.texto || "")}</li>`)
    .join("");
  const fontes = (curriculo.fontes || [])
    .filter((f) => /^https:\/\//.test(String(f.url)))
    .map((f) => `<li><a href="${escapar(f.url)}" target="_blank" rel="noopener noreferrer">${escapar(f.label || f.url)}</a></li>`)
    .join("");
  return `
    ${dicas ? `<section class="resume-section"><h3 class="resume-section__title">Dicas para montar o seu</h3><ul class="resume-section__list">${dicas}</ul></section>` : ""}
    ${fontes ? `<section class="resume-section"><h3 class="resume-section__title">Fontes</h3><ul class="resume-section__list">${fontes}</ul></section>` : ""}
  `;
}

function criarCorpoCurriculo(curriculo) {
  const contato = curriculo.contato || {};

  return `
    ${
      curriculo.ficticio || curriculo.paraQuem
        ? `
          <section class="resume-section resume-section--aviso">
            <p>${curriculo.ficticio ? "<strong>Modelo fictício:</strong> nomes, empresas e contatos são exemplos. " : ""}${escapar(curriculo.paraQuem || "")}</p>
          </section>
        `
        : ""
    }
    ${
      curriculo.objetivo
        ? `
          <section class="resume-section">

            <h3 class="resume-section__title">
              Objetivo
            </h3>

            <p class="resume-section__text">
              ${escapar(curriculo.objetivo)}
            </p>

          </section>
        `
        : ""
    }

    ${
      curriculo.resumo
        ? `
          <section class="resume-section">

            <h3 class="resume-section__title">
              Resumo profissional
            </h3>

            <p class="resume-section__text">
              ${escapar(curriculo.resumo)}
            </p>

          </section>
        `
        : ""
    }

    ${
      contato.email ||
      contato.telefone ||
      contato.linkedin ||
      contato.github ||
      contato.portfolio
        ? `
          <section class="resume-section">

            <h3 class="resume-section__title">
              Contato
            </h3>

            <div class="resume-contact">

              ${
                contato.telefone
                  ? `
                    <span class="resume-contact__item">
                      ${escapar(contato.telefone)}
                    </span>
                  `
                  : ""
              }

              ${
                contato.email
                  ? `
                    <a
                      class="resume-contact__item resume-contact__link"
                      href="mailto:${escapar(contato.email)}"
                    >
                      ${escapar(contato.email)}
                    </a>
                  `
                  : ""
              }

              ${
                contato.linkedin
                  ? `
                    <span class="resume-contact__item">
                      ${escapar(contato.linkedin)}
                    </span>
                  `
                  : ""
              }

              ${
                contato.github
                  ? `
                    <span class="resume-contact__item">
                      ${escapar(contato.github)}
                    </span>
                  `
                  : ""
              }

              ${
                contato.portfolio
                  ? `
                    <span class="resume-contact__item">
                      ${escapar(contato.portfolio)}
                    </span>
                  `
                  : ""
              }

            </div>

          </section>
        `
        : ""
    }

    ${
      curriculo.competencias?.length
        ? `
          <section class="resume-section">

            <h3 class="resume-section__title">
              Competências
            </h3>

            ${curriculo.competencias
              .map(
                (competencia) => `
                  <div class="resume-section">

                    <h4 class="resume-section__title">
                      ${escapar(competencia.categoria)}
                    </h4>

                    <div class="resume-tags">
                      ${criarTags(competencia.itens)}
                    </div>

                  </div>
                `,
              )
              .join("")}

          </section>
        `
        : ""
    }

    ${
      curriculo.experiencias?.length
        ? `
          <section class="resume-section">

            <h3 class="resume-section__title">
              Experiência profissional
            </h3>

            <div class="resume-experience">
              ${criarExperiencias(curriculo.experiencias)}
            </div>

          </section>
        `
        : ""
    }

    ${
      curriculo.experienciaAnterior?.length
        ? `
          <section class="resume-section">

            <h3 class="resume-section__title">
              Experiência anterior
            </h3>

            <ul class="resume-section__list">
              ${curriculo.experienciaAnterior
                .map(
                  (item) => `
                    <li>
                      <strong>
                        ${escapar(item.cargo || "")}
                      </strong>
                      — ${escapar(item.empresa || "")}
                      ${item.periodo ? ` (${escapar(item.periodo)})` : ""}
                    </li>
                  `,
                )
                .join("")}
            </ul>

          </section>
        `
        : ""
    }

    ${
      curriculo.projetos?.length
        ? `
          <section class="resume-section">

            <h3 class="resume-section__title">
              Projetos
            </h3>

            ${curriculo.projetos
              .map(
                (projeto) => `
                  <article class="resume-project">

                    <h4 class="resume-project__name">
                      ${escapar(projeto.nome || "")}
                    </h4>

                    <p class="resume-project__description">
                      ${escapar(projeto.descricao || "")}
                    </p>

                    ${
                      projeto.tecnologias?.length
                        ? `
                          <div class="resume-tags">
                            ${criarTags(projeto.tecnologias)}
                          </div>
                        `
                        : ""
                    }

                  </article>
                `,
              )
              .join("")}

          </section>
        `
        : ""
    }

    ${
      curriculo.formacao?.length
        ? `
          <section class="resume-section">

            <h3 class="resume-section__title">
              Formação
            </h3>

            <div class="resume-education">
              ${criarFormacao(curriculo.formacao)}
            </div>

          </section>
        `
        : ""
    }

    ${
      curriculo.certificados?.length
        ? `
          <section class="resume-section">

            <h3 class="resume-section__title">
              Cursos e certificados
            </h3>

            <ul class="resume-section__list">
              ${criarLista(curriculo.certificados)}
            </ul>

          </section>
        `
        : ""
    }

    ${
      curriculo.idiomas?.length
        ? `
          <section class="resume-section">

            <h3 class="resume-section__title">
              Idiomas
            </h3>

            <ul class="resume-section__list">
              ${curriculo.idiomas
                .map(
                  (idioma) => `
                    <li>
                      <strong>
                        ${escapar(idioma.idioma)}
                      </strong>
                      — ${escapar(idioma.nivel)}
                    </li>
                  `,
                )
                .join("")}
            </ul>

          </section>
        `
        : ""
    }

    ${
      curriculo.comunidade?.length
        ? `
          <section class="resume-section">

            <h3 class="resume-section__title">
              Comunidade
            </h3>

            <ul class="resume-section__list">
              ${criarLista(curriculo.comunidade)}
            </ul>

          </section>
        `
        : ""
    }
  `;
}

export function renderCurriculos({ container, template, dados, visiveis }) {
  /* criarCorpoCurriculo + orientação (dicas e fontes) */
  if (!template) {
    console.error("Template #curriculo-template não encontrado.");

    return;
  }

  const lista = document.createElement("div");

  lista.className = "resume-list";

  dados.slice(0, visiveis).forEach((curriculo) => {
    const clone = template.content.cloneNode(true);

    const nome = clone.querySelector(".resume-item__name");

    const titulo = clone.querySelector(".resume-item__title");

    const localizacao = clone.querySelector(".resume-item__location");

    const summary = clone.querySelector(".resume-item__summary");

    const body = clone.querySelector(".resume-item__body");

    nome.textContent = curriculo.nome || "Nome não informado";

    titulo.textContent = curriculo.titulo || "Título profissional";

    localizacao.textContent =
      curriculo.localizacao || "Localização não informada";

    summary.textContent = curriculo.resumo || "";

    body.innerHTML = criarCorpoCurriculo(curriculo) + criarOrientacao(curriculo);

    lista.appendChild(clone);
  });

  container.appendChild(lista);
}

export function iniciarAccordionCurriculos(container) {
  container.addEventListener("click", (event) => {
    const trigger = event.target.closest(".resume-item__trigger");

    if (!trigger) {
      return;
    }

    const item = trigger.closest(".resume-item");

    if (!item) {
      return;
    }

    const aberto = item.classList.contains("is-open");

    container.querySelectorAll(".resume-item.is-open").forEach((outro) => {
      outro.classList.remove("is-open");

      outro
        .querySelector(".resume-item__trigger")
        ?.setAttribute("aria-expanded", "false");
    });

    if (!aberto) {
      item.classList.add("is-open");

      trigger.setAttribute("aria-expanded", "true");
    }
  });
}
