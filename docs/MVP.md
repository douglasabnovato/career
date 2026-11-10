# MVP: career

**Nível:** N3 (produto). Proposta do Claude em 10/11/2026; o autor confirma.
**Resumo:** 5 de 12 aplicáveis atendidos
**Finalizado:** não. Falta do código: fluxo na CI, falhas com teste, desempenho no celular, axe e segurança confirmados na produção. Falta do autor: hipótese (#23) e medição de uso (#24), alertas do Dependabot e levar as integrações para a `main`.

Régua: `engenharia/arquitetura/padroes.md`. "Atende" só com comando, data e resultado.

## Problema e público
Empresas, vagas, perfis profissionais e modelos de currículo para quem procura a primeira vaga em tecnologia ou a próxima (README e `/conheca`).

## Critérios (10/11/2026)

| # | Critério | Situação | Evidência |
|---|---|---|---|
| 1 | Problema e público claros | Atende | Empresas, vagas, perfis profissionais e modelos de currículo para quem procura a primeira vaga em tecnologia ou a próxima (README e `/conheca`). |
| 2 | Hipótese a validar | Não atende | Nenhuma hipótese escrita. A aposta é do autor: [learntech-content#23](https://github.com/douglasabnovato/learntech-content/issues/23). |
| 3 | Fluxo principal completo | Parcial | `npm run e2e` no learntech-content, contra a produção, em 10/11/2026: 2 de 2 fluxos (busca filtra o catálogo, detalhe da empresa). Fora da CI ([learntech-content#10](https://github.com/douglasabnovato/learntech-content/issues/10)). |
| 4 | Escopo enxuto | Atende | Seção "Fora do MVP" abaixo, com as decisões do autor. |
| 5 | Medição de uso | Não atende | Sem painel de visitas. A API registra só as identificações (D1). Ferramenta gratuita a escolher: [learntech-content#24](https://github.com/douglasabnovato/learntech-content/issues/24). |
| 6 | Falhas tratadas | Parcial | `tests/api.test.js` cobre a falha da API com a cópia de reserva; estado vazio com "Limpar filtros" (#28). Carregamento sem teste próprio. |
| 7 | Desempenho aceitável | Não atende | `npm run ux:lighthouse` (móvel) contra a produção em 10/11/2026, 3 execuções. Home: 6,0 / 5,7 / 6,5 s, mediana 6,0 s, TBT 11 ms, CLS 0,64; empresa: 5,1 / 3,5 / 4,4 s, mediana 4,4 s, TBT 0 ms, CLS 0,45. Na home, o elemento do LCP é o texto da janela de identificação. CLS alto: [#36](https://github.com/douglasabnovato/career/issues/36). Meta: 2,5 s. |
| 8 | Acessibilidade básica | Parcial | Produção, axe em 10/11/2026: `color-contrast` 23, `label-content-name-mismatch` 9 e `target-size` 3 na home. Na `developer-mvp-2026-2`, axe local sem violações nos temas claro e escuro ([#33](https://github.com/douglasabnovato/career/issues/33)). Falta confirmar na produção. |
| 9 | Segurança e conformidade | Parcial | `npm audit --omit=dev` em 10/11/2026: 0 vulnerabilidades. Alertas do Dependabot desligados (`gh api .../dependabot/alerts` responde 403 em 10/11/2026; ligar é do autor). Sem segredo no código. Falta a CSP ([#32](https://github.com/douglasabnovato/career/issues/32)). |
| 10 | Entrega confiável | Atende | `gh api repos/douglasabnovato/career/rulesets` em 10/11/2026: ruleset "main protegida" ativo (check `verificar` obrigatório, sem force push, sem apagar a `main`). CI em todo push e PR. |
| 11 | Testes dos fluxos críticos | Atende | CI da branch `feature/tasks-10-11-2026-c` em 10/11/2026 (run 42852053168): 21 testes, 21 passando, 0 pulados. |
| 12 | Documentação honesta | Atende | Os comandos `npm run` citados existem; `copias`, `sitemaps` e `validar` são da API (conferido em 10/11/2026). |

## Fora do MVP
- Domínio próprio e qualquer serviço pago: o ambiente fica gratuito (decisão do autor, 10/11/2026).
- Identificação opcional: a identificação obrigatória continua ([learntech-content#5](https://github.com/douglasabnovato/learntech-content/issues/5), não autorizada pelo autor em 10/11/2026).
- Votação de temas nos cards de programa ([learntech-content#4](https://github.com/douglasabnovato/learntech-content/issues/4), aguardando o autor).
- Currículos para imprimir e com link direto ([#29](https://github.com/douglasabnovato/career/issues/29)): depois do MVP.

## Histórico
- 10/11/2026: primeira tabela, depois do ciclo de acessibilidade e busca nos quatro sites.
