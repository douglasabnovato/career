# Estado do projeto: career

**Atualizado em 06/11/2026.** Este arquivo responde a três perguntas: onde o projeto está, o que já fizemos e o que queremos fazer. Para trazer conteúdo novo ou mudar o site, siga [`COMO-EVOLUIR.md`](COMO-EVOLUIR.md).

## Onde está

| Item | Situação |
|---|---|
| Produção | `https://douglasabnovato.github.io/career/` (GitHub Pages, publicado a cada push na `main`) |
| Repositório | `main` protegida (check `verificar` obrigatório, sem force push). Fluxo: `feature/tasks-DD-MM-AAAA` → `developer-mvp-2026-2` → `main`, só fast-forward |
| CI | `npm ci`, lint, `format:check`, 15 testes (`node --test`) e `verificar.ps1` |
| Conteúdo | 43 empresas, 24 plataformas de vagas, 14 perfis e 5 modelos de currículo, com reserva local gerada pela API |
| Acessibilidade | Sem violação crítica no axe. Restam contraste (23 na home, 5 na empresa), nome acessível diferente do texto visível (10) e área de toque (3), na #33 |

## O que fizemos

| Período | Entregas |
|---|---|
| 28 e 29/10 | Detalhes dos conteúdos e funções novas |
| 31/10 | Cópias da API, currículos e "Veja também" |
| 01/11 | Dica de níveis de habilidade nos currículos |
| 03/11 | CI com testes, ferramentas de lint e formato, sitemap; empresas, vagas e perfil novos; checagem de acessibilidade seguindo o `detalhe.html` |
| 05/11, conteúdo | Lote 4: Zé Delivery, Nubank, Remotar, Loiane Groner e currículo sênior |
| 05/11, MVP | Código formatado, lint e formato obrigatórios na CI; `urlSegura` em todo link vindo de dado; SEO do detalhe com `?tipo=&id=` e canonical; página 404 |
| 05/11, estabilidade | e2e contra a produção passando; `COMO-EVOLUIR.md`; README com os números reais |
| 06/11 | Este documento, README com o estado e issue nova (#33) |

Detalhes: `docs/claudeia/diagnostico-mvp-2026-11-03.md` e `docs/claudeia/06-mvp-2026-11-03.md`.

## O que queremos fazer

Todas as issues têm o label `proximos-passos` e pelo menos três critérios de entrega. A ordem é a sugerida.

| Ordem | Issue | O quê | Tipo |
|---|---|---|---|
| 1 | [#33](https://github.com/douglasabnovato/career/issues/33) | Acessibilidade: contraste, nome acessível e área de toque | acessibilidade |
| 2 | [#28](https://github.com/douglasabnovato/career/issues/28) | Filtro por categoria e seção refletidos na URL | frontend |
| 3 | [#31](https://github.com/douglasabnovato/career/issues/31) | Limpar os 25 assets sem referência (cerca de 12 MB) | performance |
| 4 | [#30](https://github.com/douglasabnovato/career/issues/30) | Lighthouse e e2e da career com relatório | qualidade |
| 5 | [#32](https://github.com/douglasabnovato/career/issues/32) | Content-Security-Policy compatível com a API e o Turnstile | segurança |
| 6 | [#29](https://github.com/douglasabnovato/career/issues/29) | Currículos: imprimir, link direto e mais níveis | produto, conteúdo |

As outras issues abertas (mapeamento de oportunidades, benchmarking, artigos e referências) são **material de conteúdo**. Elas entram pela API, pelo processo de remessa do `learntech-content`.

## Decisões que dependem do autor
- Modal de identificação obrigatório ou opcional (learntech-content #5).
- Quais níveis de currículo entram depois do sênior (#29).

## Como manter este arquivo
Ao fim de cada rodada: acrescente uma linha em "O que fizemos", atualize "Onde está" com os números de `npm test` e das cópias, e troque as issues fechadas por novas em "O que queremos fazer". A visão do ecossistema fica em `learntech-content/docs/ESTADO-DO-PROJETO.md`.
