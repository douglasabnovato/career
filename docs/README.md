# career: documentação de engenharia

Site de empresas, plataformas de vagas, perfis de devs para acompanhar e modelos de currículo. Publicado no GitHub Pages (`https://douglasabnovato.github.io/career`).

## Stack
- HTML, CSS e JavaScript em módulos ES, sem build e sem dependências em produção. O `package.json` só traz as ferramentas de desenvolvimento (ESLint e Prettier).
- **Páginas:** `index.html` (catálogo), `detalhe.html` (página de detalhe por `?tipo=...&id=...`; o formato antigo `#tipo=...&id=...` continua aceito) e `404.html`.

## Como rodar do zero
Sirva a pasta com qualquer servidor estático (por exemplo, `npx serve .` ou a extensão Live Server) e abra `index.html`. Abrir o arquivo direto no navegador não funciona, porque os módulos ES exigem HTTP.

## De onde vêm os dados
- **Endereço da API:** `js/config.js` (`API_URL`). Vazio = só dados locais.
- **Busca:** `js/api.js` tenta a API e cai na cópia local se ela falhar.
- **Cópias de reserva**, geradas pelo `npm run copias` da API (não edite à mão):
  - `js/good-companies.js` (empresas);
  - `js/jobs.js` (vagas);
  - `js/perfis-dev.js` (perfis);
  - `js/destaques.js` (carrossel);
  - `js/curriculos.js` (modelos de currículo fictícios).
- **Detalhe:** o campo `detalhe` não vai para a cópia. Sem API, o card abre o site oficial.

## Estrutura
- `js/catalog.js`, `js/app.js`, `main.js`: montagem do catálogo.
- `js/detalhe.js`: página de detalhe, com "Veja também no ecossistema".
- `js/curriculos-render.js`: modelos de currículo.

## Qualidade e deploy
- **Deploy:** push na `main` publica no GitHub Pages (`.nojekyll`).
- **Verificação estática:** `docs/claudeia/verificar.ps1` confere arquivos, dados e links; detalhes em `docs/claudeia/04-testes-automatizados.md`.
- **CI:** `.github/workflows/ci.yml` roda `npm ci`, `verificar.ps1`, `node --check`, `npm run lint`, `npm run format:check` e `node --test`.

## Pendências de engenharia
O backlog fica em `learntech-content/docs/engenharia/backlog.md`. Para este site: acessibilidade do banner e do menu, filtro por categoria com estado na URL, CSP, e2e e Lighthouse. CI e testes com `node --test` já existem.
