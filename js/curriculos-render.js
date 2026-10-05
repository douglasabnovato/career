function criarLista(items = []) {
  return items.map((item) => `<li>${item}</li>`).join("");
}

function criarTags(items = []) {
  return items
    .map(
      (item) => `
        <span class="resume-tag">
          ${item}
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
            ${experiencia.cargo || ""}
          </h4>

          <p class="resume-experience__company">
            ${experiencia.empresa || ""}
          </p>

          <p class="resume-experience__meta">
            ${experiencia.periodo || ""}
            ${experiencia.local ? ` • ${experiencia.local}` : ""}
            ${experiencia.modelo ? ` • ${experiencia.modelo}` : ""}
          </p>

          ${
            experiencia.descricaoEmpresa
              ? `
                <p class="resume-experience__description">
                  ${experiencia.descricaoEmpresa}
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
            ${item.curso || ""}
          </h4>

          <p class="resume-education__institution">
            ${item.instituicao || ""}
          </p>

          <p class="resume-education__meta">
            ${item.periodo || ""}
            ${item.status ? ` • ${item.status}` : ""}
          </p>

        </article>
      `,
    )
    .join("");
}

function criarCorpoCurriculo(curriculo) {
  const contato = curriculo.contato || {};

  return `
    ${
      curriculo.objetivo
        ? `
          <section class="resume-section">

            <h3 class="resume-section__title">
              Objetivo
            </h3>

            <p class="resume-section__text">
              ${curriculo.objetivo}
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
              ${curriculo.resumo}
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
                      ${contato.telefone}
                    </span>
                  `
                  : ""
              }

              ${
                contato.email
                  ? `
                    <a
                      class="resume-contact__item resume-contact__link"
                      href="mailto:${contato.email}"
                    >
                      ${contato.email}
                    </a>
                  `
                  : ""
              }

              ${
                contato.linkedin
                  ? `
                    <span class="resume-contact__item">
                      ${contato.linkedin}
                    </span>
                  `
                  : ""
              }

              ${
                contato.github
                  ? `
                    <span class="resume-contact__item">
                      ${contato.github}
                    </span>
                  `
                  : ""
              }

              ${
                contato.portfolio
                  ? `
                    <span class="resume-contact__item">
                      ${contato.portfolio}
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
                      ${competencia.categoria}
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
                        ${item.cargo || ""}
                      </strong>
                      — ${item.empresa || ""}
                      ${item.periodo ? ` (${item.periodo})` : ""}
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
                      ${projeto.nome || ""}
                    </h4>

                    <p class="resume-project__description">
                      ${projeto.descricao || ""}
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
                        ${idioma.idioma}
                      </strong>
                      — ${idioma.nivel}
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

    body.innerHTML = criarCorpoCurriculo(curriculo);

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
