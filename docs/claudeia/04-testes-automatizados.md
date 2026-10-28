# Testes automatizados: o que existe e o que o `verificar.ps1` cobre

## Situação medida

| Recurso | Existe? | Evidência |
|---|---|---|
| `package.json` / scripts npm | Não | Ausente na raiz |
| Instalação de dependências | Não se aplica | Sem dependências locais; Fonts e Boxicons vêm de CDN |
| Lint | Não | Sem configuração de ESLint, Stylelint ou HTMLHint |
| Testes | Não | Nenhum arquivo `*.test.*` ou `*.spec.*` |
| Build | Não se aplica | Site estático publicado direto no GitHub Pages |
| CI | Não | Sem `.github/workflows` |

Por isso o `verificar.ps1` **não roda npm**. Ele faz as verificações honestas possíveis num site estático.

## Como rodar (Windows, na raiz do projeto)

```powershell
powershell -ExecutionPolicy Bypass -File docs\claudeia\verificar.ps1          # offline
powershell -ExecutionPolicy Bypass -File docs\claudeia\verificar.ps1 -Online  # inclui o site publicado e os links externos
```

O script para no primeiro erro (código de saída 1). Avisos aparecem em amarelo e não param a execução.

## Etapas

| # | Etapa | O que confere | Para em erro? |
|---|---|---|---|
| 1 | Raiz | Está na pasta certa (`index.html`, `main.js`, `js\app.js`, `css\layout.css`) | Sim |
| 2 | Referências locais | Todo `src`/`href` do HTML, `url()`/`@import` do CSS, `import` dos módulos JS, caminhos `./assets` e `./public` nos dados e ícones do manifest apontam para arquivos existentes | Sim |
| 3 | Sintaxe JS | `node --check --input-type=module` em `main.js` e `js\*.js`. Pulado com aviso se o Node não estiver instalado | Sim |
| 4 | SEO/a11y mínimo | `lang="pt-BR"`, meta description e `aria-labelledby` do modal (regressão do lote 1) | Sim |
| 5 | Qualidade | Links `http://`, imagens usadas acima de 300 KB, peso total das imagens referenciadas, sobra de texto no README | Não (aviso) |
| 6 | `-Online`: publicação | `https://douglasabnovato.github.io/career/` responde 200 com o título "Career \| learnTECH" | Sim |
| 7 | `-Online`: links externos | `site_url`, `career_url` e `url` dos dados respondem a HEAD | Não (aviso) |

## O que NÃO é coberto

| Lacuna | Por quê | Como cobrir (proposta) |
|---|---|---|
| Comportamento em execução (busca, paginação, tema, modal, accordion) | Sem navegador automatizado | Roteiro manual (05); no futuro, Playwright, que já está no plano do robô de vagas |
| Regras de negócio (seção lembrada, 8+6 itens, fallback da API) | Sem testes unitários | L2-02: `node --test` sem dependências para `utils.js`, `banner-data.js` e `catalog.js` com `fetch` simulado |
| Aparência e regressão visual | Sem screenshots de referência | Comparação manual (05) ou Playwright com `toHaveScreenshot` |
| Identificação e catálogo remoto | API inativa (`js/config.js:3`) | Testar depois da decisão P1 |
| Acessibilidade completa | Só checagens textuais | Lighthouse ou axe no navegador (05) |
| Links externos que bloqueiam HEAD | Alguns sites devolvem 403/405 | Abrir manualmente os que gerarem aviso |

## Validação feita pelo revisor

Cópias dos `.js` editados passaram em `node --check` fora da pasta do projeto. Um levantamento em Python achou 61 referências locais, nenhuma quebrada. **O `verificar.ps1` não foi executado** (o ambiente do revisor não tem PowerShell). Na primeira execução, se der erro na lógica do próprio script, o problema está no script e não no site.
