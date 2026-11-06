# Diagnóstico MVP: career (douglasabnovato.github.io/career)

Data: 03/11/2026. Só leitura: nenhum arquivo do repositório foi alterado.
Base: `Readme.md`, `docs/`, `package.json`, `index.html`, `detalhe.html`, `main.js`, `js/`, `css/`, `tests/`, `sitemap.xml`, `.github/workflows/ci.yml`, `learntech-content/docs/processo/ESTADO.md`, o SDK `learntech-content/public/sdk/identificacao.js` e o gerador `learntech-content/scripts/gerar-sitemaps.mjs`.

**Comandos executados**
- `npm test`: 12 de 12 passando.
- `npm run lint`: 0 erros.
- `npm run format:check`: **falha em 13 arquivos.** São 7 de código (`app.js`, `banner.js`, `catalog.js`, `curriculos-render.js`, `detalhe.js`, `theme.js`, `utils.js`), 1 de teste (`tests/api.test.js`) e as 5 cópias geradas pela API.
- `git log`: a `main` local está 3 commits à frente da `origin/main` (`c2b3742`, `3142a51`, `56be9fa`). O `56be9fa` apareceu durante a análise, o que indica alguém trabalhando em paralelo. O ESTADO diz que a branch do dia está "sem commit", o que não bate com o repositório.

**Nota sobre o README:** no Git só existe `Readme.md` (`git ls-tree HEAD` e `origin/main`). Não há `README.md` na raiz. Com `core.ignorecase=true` no Windows, os dois nomes apontam para o mesmo arquivo. O outro README do repositório é o `docs/README.md`.

---

## 1. Produto

### Proposta de valor
Curadoria de carreira tech em pt-BR, com quatro áreas:
- empresas "legais para trabalhar" (41);
- plataformas para buscar vaga (23);
- perfis de referência (13);
- modelos de currículo fictícios por nível (10: estágio, transição, júnior e pleno).

Cada item tem página de detalhe com fontes, data de atualização e "Veja também no ecossistema". No conteúdo da API, 100% dos itens têm `detalhe`. Têm `relacionados`: 36 de 41 empresas, 21 de 23 vagas e 9 de 13 perfis.

### Público
Estudante, quem está em transição de carreira, dev júnior ou pleno e aluno do ecossistema learnTECH/ByteClass. O sotaque local de Juiz de Fora (Programadores JF, Guiando, Viva Eventos) é um diferencial.

### Jornadas

| Jornada | Situação | Evidência |
|---|---|---|
| Buscar | Funciona, com texto livre e debounce de 300 ms. Só busca na seção atual, embora o placeholder prometa "vagas, empresas ou mentores" | `index.html:91`; `js/app.js:352-358` |
| Filtrar | **Lacuna.** Não há filtro por categoria nem por local, nem estado na URL (o tools tem os dois) | `js/app.js:310-361` |
| Abrir detalhe | Funciona com a API: o card vai para `detalhe.html#tipo=&id=`. Sem API, o card abre o site oficial, porque as cópias locais não têm `slug` nem `detalhe` (0 ocorrências de `slug` em `js/good-companies.js`) | `js/app.js:197-213`; `js/detalhe.js:226-252` |
| Relacionados | Funciona ("Veja também no ecossistema") | `js/detalhe.js:108-123` |
| Currículos | Funciona: acordeão com dicas e fontes e aviso "Modelo fictício". **Faltam** imprimir/baixar, os níveis sênior e liderança, e um link direto para cada modelo (não há página de detalhe por modelo) | `js/curriculos-render.js:446-518` |
| Compartilhar uma seção | **Lacuna.** A seção fica no `localStorage` (`career:secao`) e não na URL | `js/app.js:117-126` e `276-280` |
| Primeira visita | **Atrito alto.** O SDK de identificação pede nome e e-mail com modal **obrigatório**, porque `carregarIdentificacao` não passa `data-obrigatorio="false"` | `js/api.js:57-66`; `identificacao.js:15` e `:35` |

### Pronto
Catálogo com as 4 seções, detalhe seguro (só `textContent`, `urlSegura`, `youtube-nocookie`), tema, banner com `prefers-reduced-motion`, fallback local, CI e testes.

### Lacunas para o MVP
1. Filtro por categoria e estado na URL.
2. Decisão sobre o modal obrigatório.
3. SEO do detalhe (seção 2).
4. Página 404.
5. Imprimir currículo.
6. Documentação desatualizada.
7. Medição.

### Métricas propostas
| Métrica | Fonte | Situação |
|---|---|---|
| Acessos por sessão e página | `POST /v1/acessos` do SDK (`identificacao.js:80`) | Existe; falta um painel |
| Taxa de abandono no modal de identificação | Evento no SDK | Não existe |
| CTR do card para o detalhe e do detalhe para o site oficial | Evento de clique | Não existe |
| Buscas sem resultado (termo) | `js/app.js:144` | Não existe |
| Taxa de fallback local (API fora ou lenta) | `console.warn` em `js/catalog.js:17` | Só no console |
| Lighthouse (Perf, A11y, SEO ≥ 90) e páginas indexadas | Lighthouse e Search Console | Não rodado (ESTADO, "Falta") |

---

## 2. Engenharia

### Estrutura
- HTML, CSS e ES Modules sem build.
- `main.js` espera a API por até 1,5 s (`main.js:7-13`) e depois cai na cópia local.
- `js/app.js` (439 linhas) é um objeto `App` com estado, renderização e eventos.
- `js/detalhe.js` (289 linhas) é bem isolado.
- `js/api.js` e `js/catalog.js` cuidam dos dados.
- O `api.js` é quase idêntico ao do tools: código duplicado entre os sites.

### Testes
- 12 testes de unidade (api, catalog, utils e o contrato das cópias).
- **Sem teste para:**
  - `montarDestaques` (`js/banner-data.js:113`), que é testável hoje em Node;
  - `urlSegura` e `formatarData` (`js/detalhe.js:25` e `:41`), privadas, que seria preciso extrair para `utils.js`;
  - a busca e a paginação do `App`, que dependem de DOM.

### CI
`.github/workflows/ci.yml` roda `verificar.ps1`, `node --check` e `node --test`.

**Falta na CI:**
- `npm run lint` e `format:check`, porque a CI não faz `npm ci`;
- conferir o `sitemap.xml`;
- e2e e Lighthouse.

### Acessibilidade
**Bom:**
- skip-link (`index.html:63`);
- `aria-pressed` no menu;
- `aria-live` na grade (`index.html:172`);
- `:focus-visible` (`css/style.css:4`);
- `prefers-reduced-motion` (`css/banner.css:157`, `css/style.css:37`).

**Problemas:**
- O banner usa `<h2>` (`js/banner.js:25`) antes do `<h1>` da página (`index.html:145`), o que quebra a hierarquia.
- Os dots do banner não têm `aria-current` (`js/banner.js:41`), e não há botões anterior/próximo, embora o Readme fale em "navegação manual" (`Readme.md:68`).
- `Escape` não fecha o menu mobile (`js/app.js:406-410`).
- Concordância no estado vazio: "Nenhuma dev" e "Nenhuma currículo" (`js/app.js:147`, com `singular` vindo de `secoes`).
- O `#section-title` usa `innerHTML` com HTML fixo (`js/app.js:297`). É seguro hoje, mas pede comentário.

### SEO
**Bom:** `index.html` tem description, canonical, OG e Twitter (`index.html:8-25`).

**Problemas:**
- `detalhe.html` não tem `canonical` nem `og:url` (`detalhe.html:16-19`).
- O `og:title` só muda via JS (`js/detalhe.js:61`), e robôs de rede social não rodam JS: todo compartilhamento sai como "Career | learnTECH".
- O `sitemap.xml` tem 78 URLs no formato `?tipo=&id=` (41 empresas, 23 vagas, 13 perfis e a home). Os links internos usam `#tipo=` (`js/app.js:199`), e o buscador ignora o fragmento. Resultado: o detalhe só é descoberto pelo sitemap, e não há ligação interna rastreável.
- Os modelos de currículo não entram no sitemap.
- Não há `robots.txt`, porque página de projeto no GitHub Pages não tem raiz. Por isso o sitemap precisa ser enviado no Search Console.

### Performance
- `assets/` tem cerca de 20 MB. **26 de 71 arquivos não têm referência (12,3 MB):** `assets/logo/amarelo.png` (1,6 MB), `roxo.png` (1,9 MB), `vermelho.png` (1,7 MB), `career-laranja.png`, `tools-azul.png`, `bootcamps-verde.png`, cerca de 20 miniaturas antigas em `thumb_jobs/` e `oops-404-error.*`.
- `assets/logo/logo-career.png` tem 215 KB e aparece em 40×40 no cabeçalho e no rodapé de toda página. Também é o fallback de toda miniatura (`js/app.js:215`).
- O CSS do Boxicons vem de terceiro (`unpkg.com`, `index.html:39`), bloqueia a renderização e não tem SRI.
- 8 folhas CSS separadas.
- Imagens do banner com `loading="lazy"` acima da dobra (`js/banner.js:21`).

### Segurança (CSP)
**Bom:**
- `textContent` e `urlSegura` no detalhe;
- `escapar` no banner e nos currículos;
- fontes dos currículos só `https` (`js/curriculos-render.js:106`).

**Lacunas:**
1. Não há CSP. O GitHub Pages não deixa definir cabeçalhos, então o caminho é `<meta http-equiv="Content-Security-Policy">`.
2. `href` sem validar o esquema. O banner usa `escapar(item.site_url)` (`js/banner.js:27`) e o card usa `link.href = item.site_url` (`js/app.js:207`). Um `javascript:` vindo da API passaria. O risco é baixo, porque o conteúdo é do autor, mas falta a defesa em profundidade que o tools já tem (`tools/js/renderer.js:146`).
3. Boxicons do unpkg sem SRI.

**Política sugerida.** Atenção: o SDK injeta `<style>` e Turnstile, por isso o `'unsafe-inline'` em `style-src` (`identificacao.js:54`, `:65`, `:120`):
```
default-src 'self'; script-src 'self' 'sha256-<hash do script de tema>' https://learntech-content.douglasabnovato.workers.dev https://challenges.cloudflare.com;
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://unpkg.com; font-src https://fonts.gstatic.com https://unpkg.com;
img-src 'self' data: https://learntech-content.douglasabnovato.workers.dev https://www.google.com https://*.gstatic.com;
connect-src https://learntech-content.douglasabnovato.workers.dev; frame-src https://www.youtube-nocookie.com https://challenges.cloudflare.com;
base-uri 'self'; form-action 'self'; object-src 'none'
```

### Dívidas e riscos
- **Documentação.** `Readme.md` está desatualizado em vários pontos:
  - diz "três seções" quando são quatro (`Readme.md:30-34`);
  - descreve um modal da BRQ e cita `company-modal.js`, `company-opportunities.js` e `company-modal.css`, arquivos que não existem (`Readme.md:74-91`, `:149-150`, `:170`, `:207`, `:221-222`); o modal saiu no commit `983a490`, segundo `docs/claudeia/verificar.ps1:103`;
  - cita filtro "por duração" (`Readme.md:47`);
  - a árvore não mostra `destaques.js`.
  - `docs/README.md:31` diz "Ainda sem CI", mas o workflow existe.
- **Formatação:** o `format:check` falha, e o `.prettierignore` não exclui as cópias geradas.
- **Catálogo tardio:** quando o catálogo remoto chega depois de 1,5 s, `App.buscar` zera a paginação (`main.js:15-18`) e o banner fica com os destaques locais (`js/app.js:108-114` só roda no `init`).
- **Sem 404:** não há `404.html`, embora a imagem `oops-404-error.webp` já esteja no repositório.
- **Risco de conteúdo:** a issue #1 cita o Anna's Archive (biblioteca-sombra) como referência. Não deve virar link no site (direitos autorais).
- **Risco de processo:** há commits locais à frente da `origin/main` e trabalho em paralelo. Conferir antes de abrir branch.

---

## 3. Conteúdo (até 5 ideias de alto valor)

Nenhum slug abaixo existe hoje no conteúdo da API (conferido por `grep` em `learntech-content/content`).

1. **`career/empresas/ze-delivery`:** a issue #11 (Benchmarking de Empresas) agrupa as frentes "iFood, Zé Delivery e Outras". iFood e Mercado Livre já têm ficha; falta o Zé Delivery. Relacionado: o artigo "Benchmarking de UX" do learn-tech.
2. **`career/empresas/nubank`:** hoje só aparece citado em `vagas.json`. É referência nacional de produto e engenharia e liga com `ambev-tech`, `itau-unibanco` e `xp-inc`.
3. **`career/vagas/remotar`:** plataforma brasileira de curadoria **manual** de vagas remotas, no ar desde abril de 2020. O modelo de cobrança está em conflito nas fontes, então é preciso conferir no site oficial ([TecMundo](https://www.tecmundo.com.br/mercado/242722-remotar-plataforma-conecta-voce-melhores-vagas-remotas.htm), [Betterteam](https://www.betterteam.com/br/remotar)). Atende ao "remoto" da issue #12.
4. **`career/modelos-curriculo/senior-desenvolvimento-backend`:** os 10 modelos param no pleno (`js/curriculos.js`, campo `nivel`). Um modelo sênior/tech lead fecha a trilha, mantendo `ficticio: true` e o contato `@example.com` exigidos por `tests/dados.test.js:21-27`.
5. **`career/perfis/loiane-groner`:** figura pública com conteúdo técnico gratuito em pt-BR (Java e Angular), sem sobreposição com os 13 perfis atuais. Seguir `regras-editoriais.md` e `seguranca-privacidade.md`: só perfil público, com fonte oficial.

---

## 4. Plano de ação executável hoje (em ordem de prioridade)

### T1. Formatação verde e lint e formato na CI
- **Objetivo:** `format:check` passar e a CI barrar regressões.
- **Arquivos:**
  - `.prettierignore`: incluir `js/good-companies.js`, `js/jobs.js`, `js/perfis-dev.js`, `js/destaques.js` e `js/curriculos.js`;
  - rodar `npx prettier --write "js/**/*.js" "tests/**/*.js"` nos arquivos restantes;
  - `.github/workflows/ci.yml`: passos `npm ci`, `npm run lint` e `npm run format:check`.
- **Pronto quando:** `npm run format:check` sai com 0 localmente e o job `verificar` da CI fica verde com os passos novos.
- **Risco:** diff grande só de formato. Fazer em commit isolado, sem mudança de lógica.

### T2. URLs seguras em todo `href` vindo de dado
- **Objetivo:** fechar a lacuna de `javascript:`.
- **Arquivos:**
  - mover `urlSegura` de `js/detalhe.js:25` para `js/utils.js` e exportar;
  - usar em `js/app.js:207` e `js/banner.js:27`;
  - criar `tests/utils.test.js` com casos `javascript:`, `data:`, relativo e `https`.
- **Pronto quando:** novos testes passam; `grep "site_url" js/app.js js/banner.js` só mostra chamadas por `urlSegura`.
- **Risco:** baixo. `new URL` precisa de base no Node; testar com uma base explícita.

### T3. SEO do detalhe
- **Objetivo:** cada detalhe ter canonical, `og:url` e link interno rastreável.
- **Arquivos:**
  - `detalhe.html`: `<link rel="canonical">` e `<meta property="og:url">` com placeholder;
  - `js/detalhe.js`, em `definirMeta` (`:55-62`): preencher canonical e `og:url` com `https://douglasabnovato.github.io/career/detalhe.html?tipo=<tipo>&id=<slug>`, e também `og:description`;
  - `js/app.js:199`: gerar `?tipo=&id=` em vez de `#`;
  - criar `serve.json` com `{"cleanUrls": false}`, para o `npx serve` não descartar a query, que foi o motivo do `#`.
- **Pronto quando:** em `npx serve .`, clicar num card abre `detalhe.html?tipo=empresas&id=brq` e a página carrega; `document.querySelector('link[rel=canonical]').href` é igual à URL do sitemap; `verificar.ps1` continua verde.
- **Risco:** links antigos com `#` precisam continuar funcionando. O `detalhe.js:278` já aceita os dois formatos.

### T4. Higiene de assets e 404
- **Objetivo:** cortar cerca de 12 MB e ter página de erro.
- **Arquivos:**
  - remover os 26 arquivos sem referência em `assets/logo/` e `assets/thumb_*`, antes conferindo com `grep -r` nos repositórios irmãos (learn-tech e bootcamps podem apontar para o GitHub Pages da career);
  - recomprimir `assets/logo/logo-career.png` para menos de 20 KB (80×80);
  - criar `404.html` usando `assets/error/oops-404-error.webp`, com link para `./`.
- **Pronto quando:** `du -sh assets` fica abaixo de 9 MB; `verificar.ps1` está verde; `/career/xyz` no Pages mostra a 404.
- **Risco:** apagar um arquivo usado por outro site. Mitigar com o `grep` cruzado. O histórico do Git preserva os arquivos.

### T5. Documentação em dia
- **Objetivo:** Readme e docs refletirem o código.
- **Arquivos:**
  - `Readme.md`: remover a seção do modal da BRQ e as oportunidades (`:74-91`, `:106-124`), os arquivos inexistentes (`:149-150`, `:170`, `:207`, `:221-222`) e "duração" (`:47`); trocar "três seções" por quatro e incluir Currículos; citar que as cópias são geradas;
  - `docs/README.md:31` e `:34`: CI existe e testes existem.
- **Pronto quando:** `grep -n "company-modal\|company-opportunities\|Ainda sem CI" Readme.md docs/README.md` não devolve nada.
- **Risco:** nenhum.

### T6. CSP por meta e Boxicons com SRI
- **Objetivo:** primeira camada de CSP.
- **Arquivos:**
  - `index.html` e `detalhe.html`: `<meta http-equiv="Content-Security-Policy">` com a política da seção 2 e o `sha256` do script inline de tema (`index.html:49-59`, `detalhe.html:42-52`);
  - `integrity` e `crossorigin` no link do Boxicons, ou hospedar o Boxicons localmente.
- **Pronto quando:** com `npx serve .`, o console não mostra violação de CSP no catálogo, no detalhe (com vídeo) nem no modal do SDK (Turnstile); `verificar.ps1` está verde.
- **Risco:** médio. O SDK e o Turnstile podem pedir origens a mais. Testar o fluxo completo do modal antes do merge; se algo quebrar, reverter só a meta.

---

## 5. Issues de próximos passos

Labels existentes: `bug`, `documentation`, `enhancement`, `good first issue`. Labels a criar: `mvp`, `seo`, `a11y`, `performance`, `seguranca`, `conteudo`, `produto`.

### I1. Filtro por categoria e estado da seção na URL
- **Contexto:** a busca é só por texto e a seção fica no `localStorage` (`js/app.js:117-126`), então não dá para compartilhar "Empresas › Educação". O tools já resolveu isso com chips e `?s=&c=&q=` (`tools/js/renderer.js:107-129` e `:218-242`).
- **Critérios de entrega:**
  - chips de categoria com contagem, montados a partir dos dados;
  - `?s=companies&c=Educação&q=x` reabre exatamente o recorte;
  - o clique no chip ativo desmarca;
  - teste de unidade da função de filtro pura.
- **Labels:** `enhancement`, `mvp`, `produto`.

### I2. Decidir e configurar o modal de identificação (obrigatório ou opcional)
- **Contexto:** `js/api.js:57-66` injeta o SDK sem `data-obrigatorio="false"`, e o modal bloqueia o catálogo inteiro na primeira visita (`identificacao.js:15`, `:141-142`). Num catálogo público isso derruba a conversão e atrapalha o Lighthouse e o e2e.
- **Critérios de entrega:**
  - decisão registrada pelo autor em `docs/`;
  - se opcional, `s.dataset.obrigatorio = "false"` aplicado, com o botão "Agora não" visível;
  - métrica de abandono do modal definida no SDK.
- **Labels:** `produto`, `mvp`.

### I3. Detalhe compartilhável: canonical, og:url e prévia por item
- **Contexto:** robôs de rede social não executam JS, então todo link de detalhe sai como "Career | learnTECH" (`detalhe.html:17`). O `sitemap.xml` usa `?tipo=`, mas os links internos usam `#` (`js/app.js:199`).
- **Critérios de entrega:**
  - canonical e `og:url` corretos em todo detalhe;
  - links internos em `?tipo=&id=`;
  - estudo registrado sobre páginas estáticas por item, geradas pelo `exportar-copias` da API, para OG real;
  - sitemap enviado no Search Console, com o print anexado.
- **Labels:** `seo`, `mvp`.

### I4. Currículos: imprimir, link direto e nível sênior
- **Contexto:** os modelos só existem no acordeão (`js/curriculos-render.js:446`), sem URL própria e sem impressão, e param no pleno.
- **Critérios de entrega:**
  - `@media print` imprime só o modelo aberto, em A4 legível;
  - `?s=curriculos&id=<slug>` abre o modelo expandido;
  - um modelo sênior publicado pela API;
  - os modelos entram no sitemap.
- **Labels:** `enhancement`, `conteudo`.

### I5. Lighthouse e e2e com relatório anexado
- **Contexto:** o ESTADO lista "rodar e2e e Lighthouse" como pendência para "estável e público". Não há números de base para performance (assets de cerca de 20 MB, `logo-career.png` de 215 KB) nem de acessibilidade.
- **Critérios de entrega:**
  - relatório Lighthouse da home e de 1 detalhe em `docs/claudeia/`;
  - Performance, Acessibilidade e SEO ≥ 90;
  - e2e cobrindo busca, troca de seção, detalhe e voltar;
  - problemas abertos como issues filhas.
- **Labels:** `performance`, `a11y`, `mvp`.

### I6. Acessibilidade do banner e do menu
- **Contexto:** o banner tem `h2` antes do `h1` (`js/banner.js:25`) e dots sem `aria-current` (`:41`); `Escape` não fecha o menu (`js/app.js:406`); o estado vazio diz "Nenhuma dev" (`:147`).
- **Critérios de entrega:**
  - hierarquia de títulos válida (axe sem erro de `heading-order`);
  - `aria-current="true"` no dot ativo e botões anterior/próximo acessíveis;
  - `Escape` fecha o menu e devolve o foco ao botão;
  - texto do estado vazio com gênero correto por seção.
- **Labels:** `a11y`, `bug`, `good first issue`.

---

## 6. Melhorias do processo

1. **Issues de produto separadas do backlog pessoal.** As 9 issues abertas são de conteúdo e estudo (Medium, leitura, playlists), sem labels, e duas têm textos de 30 linhas. Criar templates (`.github/ISSUE_TEMPLATE/`) para bug, feature e conteúdo, com critérios de entrega. Mover os estudos para um repositório ou projeto próprio.
2. **Arquivos gerados nascem formatados**, ou entram no `.prettierignore` com um cabeçalho padrão. Hoje o gerador da API produz arquivos que reprovam o `format:check`.
3. **CI com `npm ci`, lint e formato** nos dois sites estáticos, mais um job que confere se o `sitemap.xml` e as cópias batem com a API (diff do `npm run copias` em modo de checagem).
4. **ESTADO.md reflete o Git.** Antes de escrever "sem commit" ou "publicado", rodar `git log origin/main..HEAD` nos cinco e colar o resultado. Hoje há 3 commits locais não publicados.
5. **Código compartilhado.** `api.js` (tempo limite, `/media/`, SDK) está duplicado entre career e tools. Servir um `cliente.js` pela própria API, versionado, ou gerá-lo pelo `exportar-copias`.
6. **Definition of Done de MVP** em `docs/processo/checklists.md`: Lighthouse ≥ 90, 0 avisos de CSP, Readme sem arquivo inexistente e métricas visíveis.

**Fontes das buscas na web:** [TecMundo, Remotar](https://www.tecmundo.com.br/mercado/242722-remotar-plataforma-conecta-voce-melhores-vagas-remotas.htm), [Betterteam, Remotar](https://www.betterteam.com/br/remotar), [B2B Stack, Remotar.jobs](https://www.b2bstack.com.br/product/remotar-jobs/alternativas).
