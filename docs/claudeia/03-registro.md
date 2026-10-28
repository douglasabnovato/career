# Registro de execução: lote 1

**Data:** 27/10/2026 · **Branch:** `feature/claudeia-2026-10-27` · **Restrições respeitadas:** nenhum comando git, npm ou node rodado na pasta; nenhum arquivo apagado; fim de linha CRLF preservado em todos os arquivos editados (conferido com `file`).

Validação feita fora da pasta: cópias dos `.js` editados passaram em `node --check --input-type=module` num ambiente isolado. Os dados de `curriculos.js`, `good-companies.js` e `company-opportunities.js` têm 0 ocorrências de `<`, `>`, `'` e `"` escapado, e 5 de `&`. Portanto, o escape não altera o texto exibido.

## Executado

| ID | Arquivo | Mudança | Como verificar |
|---|---|---|---|
| L1-01 | `index.html:24` | `og:image` de `./public/og-image-career.png` para `https://douglasabnovato.github.io/career/public/og-image-career.png` | Depois do deploy, colar a URL no LinkedIn Post Inspector ou no WhatsApp |
| L1-05 | `index.html` (div `#company-modal`) | Adicionado `aria-labelledby="company-modal-title"` | Abrir o modal da BRQ com leitor de tela (NVDA): anuncia o nome da empresa |
| L1-02 | `js/catalog.js` | Se empresas, vagas ou perfis da API não forem listas, lança erro dentro do `try`, gera um aviso e usa os dados locais | Hoje a API está inativa, sem efeito visível. Com a API ativa e um JSON inválido, o console mostra `[learntech-content] usando dados locais` |
| L1-03 | `js/app.js` (`usarCatalogo`) | `this.destaques` só é montado se `cat.destaques` for um objeto; senão vale `null` e o banner usa `launchBanner` | Banner com 3 destaques continua aparecendo |
| L1-04 | `js/company-modal.js` | `import { escapar }` e escape em `createList`, `createTags`, título, local, modelo, descrição, resumo e URL das oportunidades | Abrir BRQ: tags "Data & Analytics" aparecem iguais; abrir cada uma das 3 vagas e o link "Ver oportunidade original" |
| L1-04 | `js/curriculos-render.js` | `import { escapar }` e escape em 28 interpolações (listas, tags, experiência, formação, contato, competências, projetos, idiomas) | Seção Currículos: abrir os 3 e comparar com a versão publicada; o `mailto:` continua funcionando |
| L1-06 | `Readme.md` | Removido o trecho final que era sobra de resposta de IA; incluídos `curriculos.css`, `config.js`, `curriculos-render.js` e `curriculos.js` na árvore de pastas | Ler o fim do README |
| L1-07 | `docs/claudeia/*` | Documentação e `verificar.ps1` (novos) | `powershell -ExecutionPolicy Bypass -File docs\claudeia\verificar.ps1` |

## Não executado e motivo

| Item | Motivo |
|---|---|
| `lang` e meta description | Já estavam corretos (`index.html:2,8-11`) |
| try/catch em `localStorage` | Já existia em todos os acessos; `JSON.parse` não é usado |
| `.github/workflows/ci.yml` | Não há `package.json` nem script versionado para rodar; a regra proíbe inventar (proposta L2-01) |
| Remover o `@import` duplicado | Altera a ordem da cascata, então há risco visual (L3-03) |
| Otimizar imagens | Exige ferramenta e conferência visual (L3-01) |
| Apagar imagens não usadas | Proibido apagar; vira decisão P8 |
| Religar a API ou identificação | Decisão de produto e configuração externa (P1) |

## Pendente

Lotes L2 a L4 e decisões P1 a P9 em `02-plano-e-arquitetura.md`. O dono deve rodar `verificar.ps1` e o roteiro de `05-testes-manuais.md` antes do merge.

# Registro de execução: página de detalhe

**Data:** 28/10/2026 · **Restrições respeitadas:** nenhum npm; nenhum arquivo apagado; CRLF preservado nos arquivos do site (conferido com `file`), LF neste registro. Um `git diff --stat` (só leitura) foi rodado por engano e não deixou arquivo de trava em `.git`.

Contrato: campos opcionais `slug` e `detalhe` em empresas, vagas e perfis (`learntech-content/src/schemas/career-tools.ts`, `detalheSchema`).

| Arquivo | Mudança | Como verificar |
|---|---|---|
| `js/api.js` | Exporta `API_CONFIGURADA`; `resolverMidia` também completa `/media/` em `detalhe.imagens[].url` | Item com imagem `/media/x.jpg` aparece com a URL completa da API |
| `js/catalog.js` | Nova `carregarItem(tipo, slug)`, que reaproveita `buscarRecurso` (mesmo tempo limite) | Ver `detalhe.html` abaixo |
| `js/app.js` | Card com `slug` e `detalhe` aponta para `detalhe.html?tipo=...&id=...` (mesma aba, `aria-label` "Ver detalhes: ...") | BRQ abre o modal; item sem detalhe abre o site em nova aba |
| `detalhe.html`, `js/detalhe.js`, `css/detalhe.css` | Página nova com estados carregando, não encontrado e API indisponível | `detalhe.html?tipo=empresas&id=<slug>`, `?tipo=xxx&id=a` e API desligada |
| `Readme.md` | Seção "Página de detalhe" e árvore de pastas | Ler o README |

Validação: `node --check` em `api.js`, `catalog.js`, `app.js` e `detalhe.js`; teste de `resolverMidia` e `carregarItem` com `fetch` simulado, numa cópia fora da pasta.

Pendente: nenhum item da API tem `slug`/`detalhe` ainda, então o fluxo completo só aparece no navegador depois que o conteúdo for publicado e `API_URL` configurada (P1).
