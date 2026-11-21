# MVP: career

**Nível:** N3 (produto). Proposta do Claude em 10/11/2026; o autor confirma.
**Resumo:** 9 de 12 aplicáveis atendidos (20/11/2026)
**Finalizado:** não. Falta do código: a CSP ([#32](https://github.com/douglasabnovato/career/issues/32)). Falta do autor: decidir a hipótese (#23, proposta escrita) e a ferramenta de medição (#24, recomendação escrita), e ligar os alertas do Dependabot.

Régua: `engenharia/arquitetura/padroes.md`. "Atende" só com comando, data e resultado.

## Problema e público
Empresas, vagas, perfis profissionais e modelos de currículo para quem procura a primeira vaga em tecnologia ou a próxima (README e `/conheca`).

## Critérios (10/11/2026)

| # | Critério | Situação | Evidência |
|---|---|---|---|
| 1 | Problema e público claros | Atende | Empresas, vagas, perfis profissionais e modelos de currículo para quem procura a primeira vaga em tecnologia ou a próxima (README e `/conheca`). |
| 2 | Hipótese a validar | Não atende | Proposta escrita em 20/11/2026 ([hipoteses.md](https://github.com/douglasabnovato/learntech-content/blob/main/docs/estrategia/hipoteses.md)), no formato da [learntech-content#23](https://github.com/douglasabnovato/learntech-content/issues/23). A aposta é do autor: o critério só atende depois da decisão dele. |
| 3 | Fluxo principal completo | Atende | `npm run e2e` no learntech-content contra a produção em 20/11/2026: fluxos, acessibilidade, capturas, estabilidade e estados passaram. O workflow `e2e` roda na CI do learntech-content a cada push na `main` (sucesso em 19/11/2026) e toda segunda-feira ([learntech-content#10](https://github.com/douglasabnovato/learntech-content/issues/10)). Fluxos deste site: busca filtra o catálogo, detalhe da empresa. |
| 4 | Escopo enxuto | Atende | Seção "Fora do MVP" abaixo, com as decisões do autor. |
| 5 | Medição de uso | Não atende | Sem painel de visitas. A API registra só as identificações (D1). Recomendação pontuada das ferramentas gratuitas em 20/11/2026 ([medicao.md](https://github.com/douglasabnovato/learntech-content/blob/main/docs/estrategia/medicao.md)): Cloudflare Web Analytics. A escolha e a conta são do autor ([learntech-content#24](https://github.com/douglasabnovato/learntech-content/issues/24)). |
| 6 | Falhas tratadas | Atende | `e2e/estados.spec.mjs` no learntech-content contra a produção em 20/11/2026, 2 rodadas sem falha: home com a API lenta e fora do ar (cópia de reserva), detalhe com "Carregando..." com a API lenta e "Não foi possível carregar" com "Tentar novamente" com a API fora, busca sem resultado com o estado vazio; falha da API coberta por `tests/api.test.js`. |
| 7 | Desempenho aceitável | Atende | `npm run ux:lighthouse` (móvel) contra a produção em 19/11/2026, depois da `main`: home 98 e empresa 99 de performance, LCP 1,9 e 1,6 s, CLS 0,005 e 0, TBT 0 ms. CLS no celular com rede lenta (`e2e/estabilidade.spec.mjs`, 20/11/2026): 0 e 0,005. |
| 8 | Acessibilidade básica | Atende | Produção, axe em 20/11/2026 (`npm run e2e`, projeto acessibilidade): 0 violações em home e empresa. Lighthouse de acessibilidade de 99 a 100 na produção em 19/11/2026. |
| 9 | Segurança e conformidade | Parcial | `npm audit --omit=dev` em 10/11/2026: 0 vulnerabilidades. Alertas do Dependabot desligados (`gh api .../dependabot/alerts` responde 403 em 10/11/2026; ligar é do autor). Sem segredo no código. Falta a CSP ([#32](https://github.com/douglasabnovato/career/issues/32)). |
| 10 | Entrega confiável | Atende | `gh api repos/douglasabnovato/career/rulesets` em 10/11/2026: ruleset "main protegida" ativo (check `verificar` obrigatório, sem force push, sem apagar a `main`). CI em todo push e PR. |
| 11 | Testes dos fluxos críticos | Atende | CI da branch `feature/tasks-10-11-2026-c` em 10/11/2026 (run 42852053168): 21 testes, 21 passando, 0 pulados. |
| 12 | Documentação honesta | Atende | Os comandos `npm run` citados existem; `copias`, `sitemaps` e `validar` são da API (conferido em 10/11/2026). |

## Fora do MVP
- Domínio próprio e qualquer serviço pago: o ambiente fica gratuito (decisão do autor, 10/11/2026).
- Identificação opcional: a identificação obrigatória continua ([learntech-content#5](https://github.com/douglasabnovato/learntech-content/issues/5), não autorizada pelo autor em 10/11/2026).
- Votação de temas nos cards de programa ([learntech-content#4](https://github.com/douglasabnovato/learntech-content/issues/4), aguardando o autor).
- Currículos para imprimir e com link direto ([#29](https://github.com/douglasabnovato/career/issues/29)): entregues na `developer-mvp-2026-2` em 12/11/2026 (fce1219), com os modelos de QA e de suporte de TI na API. Valem depois do deploy.

## Histórico
- 11/11/2026: CLS resolvido (#36); o LCP continua acima da meta.
- 10/11/2026: primeira tabela, depois do ciclo de acessibilidade e busca nos quatro sites.
