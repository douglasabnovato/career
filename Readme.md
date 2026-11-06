# Career

> **Vai evoluir o projeto ou trouxe arquivos novos?** Comece por [`docs/COMO-EVOLUIR.md`](docs/COMO-EVOLUIR.md): onde fica cada coisa, o que é gerado pela API, comandos e a checklist de estabilidade.

Hub estratégico para conexões profissionais reunindo empresas de destaque, oportunidades profissionais e perfis que contribuem para a formação e evolução de pessoas desenvolvedoras.

O **Career** faz parte do ecossistema **LearnTECH** e foi desenvolvido como uma experiência independente para exploração de carreira no mercado de tecnologia.

## 📍 Estado do projeto (06/11/2026)

- **Onde está:** Em produção no GitHub Pages. CI verde com lint, formato, 15 testes e verificação estática.
- **O que fizemos na rodada de MVP (03 a 05/11):** Links vindos de dado sempre seguros, SEO do detalhe com canonical, página 404 e o lote 4 de conteúdo (Zé Delivery, Nubank, Remotar, Loiane Groner e currículo sênior).
- **O que queremos fazer:** [#33](https://github.com/douglasabnovato/career/issues/33), [#28](https://github.com/douglasabnovato/career/issues/28), [#31](https://github.com/douglasabnovato/career/issues/31), [#30](https://github.com/douglasabnovato/career/issues/30), [#32](https://github.com/douglasabnovato/career/issues/32), [#29](https://github.com/douglasabnovato/career/issues/29) (acessibilidade, filtro na URL, limpeza de assets, Lighthouse, CSP e currículos). Todas com o label `proximos-passos` e critérios de entrega.

A linha do tempo completa, os números e a ordem sugerida estão em [`docs/ESTADO-DO-PROJETO.md`](docs/ESTADO-DO-PROJETO.md).

## Visão geral

O projeto organiza conteúdos relacionados à carreira tech em quatro áreas principais:

* **Empresas** — empresas selecionadas por sua relevância, cultura, atuação e potencial de desenvolvimento profissional.
* **Plataformas Jobs** — plataformas e serviços utilizados para encontrar oportunidades profissionais na área de tecnologia.
* **Dev Profiles** — desenvolvedores, referências e profissionais que podem contribuir para a formação e evolução da comunidade.
* **Currículos** — a construção do tradicional currículo ainda é uma fase importante em processos seletivos. Por isso, a seção traz modelos fictícios por nível (estágio, transição de carreira, júnior e pleno), com dicas e fontes.

A interface foi projetada para permitir navegação simples, busca rápida e exploração progressiva dos conteúdos.

## Publicação

A aplicação possui uma versão publicada no GitHub Pages:

**douglasabnovato.github.io/career**

O projeto também está integrado ao ecossistema **LearnTECH**, onde a área de carreira funciona como ponto de entrada para conteúdos relacionados ao desenvolvimento profissional.

## Funcionalidades

### Navegação por seções

A aplicação possui quatro seções principais. Os números abaixo são os das cópias locais geradas pela API em 03/11/2026:

* Empresas (43);
* Plataformas Jobs (24);
* Dev Profiles (14);
* Currículos (5 modelos fictícios: estágio, transição de carreira, júnior, pleno e sênior de back-end).

A seção selecionada é armazenada no `localStorage`, permitindo que a aplicação preserve a última área visitada.

### Busca

A busca funciona de forma dinâmica e possui **debounce de 300 ms** para evitar processamento excessivo durante a digitação.

A busca vale para a seção aberta, ignora acentos e maiúsculas e compara o texto digitado com:

* título;
* categoria;
* localização, quando aplicável.

Ainda não existe filtro por categoria (chips) nem estado da busca na URL.

### Carregamento progressivo

A listagem utiliza o recurso **Carregar Mais**.

* A primeira renderização apresenta até 8 itens.
* Cada nova ação de carregamento adiciona mais 6 itens.
* O botão é ocultado automaticamente quando todos os resultados já foram apresentados.

### Tema claro e escuro

A interface possui alternância entre tema claro e escuro.

A preferência do usuário é armazenada no `localStorage` para ser preservada entre acessos.

### Banner

O projeto possui um banner de destaques com:

* rotação automática a cada 6 segundos (desligada com `prefers-reduced-motion`);
* indicadores de posição clicáveis (dots);
* pausa ao passar o mouse ou focar um slide.

Os destaques (uma vaga, uma empresa e um perfil) vêm de `js/destaques.js`, também gerado pela API; `js/banner-data.js` monta os slides a partir do catálogo.

### Página de detalhe

Itens de empresas, plataformas de vagas e perfis que chegam da API com `slug` e `detalhe` abrem `detalhe.html?tipo=<empresas|vagas|perfis>&id=<slug>` na mesma aba. É o mesmo endereço do `sitemap.xml`; o formato antigo `#tipo=&id=` continua aceito. Sem API, as cópias locais não trazem `slug` nem `detalhe`, e o card abre o site oficial em nova aba.

A página mostra miniatura, tipo, categoria, local ou duração, resumo, parágrafos, galeria de imagens, vídeo do YouTube (sempre pelo `youtube-nocookie.com`), botão para o site oficial, links oficiais, fontes e a data de atualização. O título, a meta description, o `og:description`, o `canonical` e o `og:url` são preenchidos pelo item (o `canonical` aponta para `https://douglasabnovato.github.io/career/detalhe.html?tipo=...&id=...`).

* Os dados vêm só da API (`/v1/career/{tipo}.json`); sem `API_URL` configurada, a página mostra um aviso e o link de volta.
* "Voltar" e os itens do menu gravam a seção em `career:secao`, para o `index.html` reabrir nela.
* Todo dado externo entra no DOM por `textContent`.
* O script de identificação é carregado como no `index.html`.

Arquivos: `detalhe.html`, `js/detalhe.js`, `css/detalhe.css`; `carregarItem` em `js/catalog.js`.

### Links externos

Os links para sites das empresas, páginas de carreira e fontes são mantidos separados da experiência interna do Career e abrem em nova aba.

Todo `href` que vem de dado (card, banner e página de detalhe) passa por `urlSegura` (`js/utils.js`): só `https:`, `http:`, `mailto:` ou caminho relativo são aceitos. Qualquer outro esquema (`javascript:`, `data:`...) vira `#` ou é descartado.

### Identificação

Com a API configurada, o `js/api.js` injeta o script único de identificação do ecossistema (`/sdk/identificacao.js`), que pede nome e e-mail, sem login. Hoje o modal é obrigatório na primeira visita, por decisão do autor.

### Página 404

O `404.html` é servido pelo GitHub Pages para qualquer endereço inexistente em `/career/`. Por isso usa caminhos absolutos (`/career/...`).

## Arquitetura

O projeto utiliza **HTML, CSS e JavaScript puros**, sem framework ou ferramenta de build.

Essa escolha é deliberada: o Career também funciona como espaço de prática e aprofundamento das tecnologias fundamentais da web antes da adoção de abstrações ou frameworks.

### JavaScript

O projeto utiliza **ES Modules**, permitindo separar responsabilidades entre dados, estado, interface e funcionalidades.

Principais módulos:

* `main.js` — ponto de entrada: carrega a identificação, espera o catálogo remoto por até 1,5 s e inicia o app.
* `app.js` — estado global, renderização, navegação, busca e paginação.
* `catalog.js` — carregamento do catálogo remoto e de um item para a página de detalhe.
* `api.js` — cliente da API (tempo limite, caminhos `/media/`) e injeção do script de identificação.
* `config.js` — endereço da API (`API_URL`).
* `detalhe.js` — página de detalhe (`detalhe.html`) de empresa, plataforma ou perfil.
* `banner-data.js` — monta os slides do banner a partir do catálogo e dos destaques.
* `banner.js` — comportamento do banner.
* `curriculos-render.js` — renderização e acordeão dos modelos de currículo.
* `theme.js` — gerenciamento do tema visual.
* `utils.js` — funções puras: busca sem acento, `escapar` para HTML e `urlSegura` para links.

Cópias geradas pela API (não edite à mão; veja "Catálogo de dados"):

* `good-companies.js` — empresas.
* `jobs.js` — plataformas de vagas.
* `perfis-dev.js` — perfis de desenvolvedores.
* `destaques.js` — seleção do banner.
* `curriculos.js` — modelos de currículo fictícios.

### CSS

O CSS é organizado por responsabilidade.

Os arquivos principais incluem:

* `layout.css` — estrutura geral e distribuição da página.
* `header.css` — cabeçalho e navegação.
* `cards.css` — componentes de cards.
* `banner.css` — banner e seus controles.
* `footer.css` — rodapé.
* `curriculos.css` — seção de currículos e acordeão.
* `detalhe.css` — página de detalhe (também usado pela 404).
* `style.css` — estilos gerais da aplicação.

## Catálogo de dados

O conteúdo do Career vem da API **learntech-content** (`/v1/career/empresas.json`, `vagas.json`, `perfis.json`, `destaques.json` e `modelos-curriculo.json`). O endereço fica em `js/config.js`.

* O `main.js` espera o catálogo remoto por até 1,5 s. Se ele não chegar a tempo, a página abre com as cópias locais e troca para os dados da API quando eles chegarem.
* Se a API falhar ou responder fora do formato, o site segue com as cópias locais.
* As cópias locais (`js/good-companies.js`, `js/jobs.js`, `js/perfis-dev.js`, `js/destaques.js` e `js/curriculos.js`) são **geradas** pelo script `exportar-copias.mjs` do repositório `learntech-content` (`npm run copias`). Não edite esses arquivos à mão: mude o conteúdo na API e gere as cópias de novo. Elas ficam fora do Prettier (`.prettierignore`).
* As cópias não levam o campo `detalhe`; por isso a página de detalhe depende da API.
* O `sitemap.xml` também é gerado pela API e lista a home e uma URL `detalhe.html?tipo=&id=` por empresa, plataforma e perfil.

## Estrutura de pastas

```text
career/
├── assets/
│   ├── error/
│   ├── logo/
│   ├── thumb_good-companies/
│   ├── thumb_jobs/
│   └── thumb_perfis-dev/
│
├── css/
│   ├── banner.css
│   ├── cards.css
│   ├── curriculos.css
│   ├── detalhe.css
│   ├── footer.css
│   ├── header.css
│   ├── layout.css
│   └── style.css
│
├── js/
│   ├── api.js
│   ├── app.js
│   ├── banner-data.js
│   ├── banner.js
│   ├── catalog.js
│   ├── config.js
│   ├── curriculos-render.js
│   ├── curriculos.js        (gerado pela API)
│   ├── destaques.js         (gerado pela API)
│   ├── detalhe.js
│   ├── good-companies.js    (gerado pela API)
│   ├── jobs.js              (gerado pela API)
│   ├── perfis-dev.js        (gerado pela API)
│   ├── theme.js
│   └── utils.js
│
├── docs/
├── public/
├── tests/
│
├── 404.html
├── detalhe.html
├── index.html
├── main.js
├── package.json             (só ferramentas de desenvolvimento)
├── serve.json
├── sitemap.xml              (gerado pela API)
└── Readme.md
```

## Como executar localmente

O projeto utiliza ES Modules através de `type="module"`.

Por esse motivo, o `index.html` **não deve ser aberto diretamente pelo navegador utilizando `file://`**.

A aplicação deve ser executada através de um servidor HTTP local.

### VS Code + Live Server

1. Abra o projeto no VS Code.
2. Abra o arquivo `index.html`.
3. Clique com o botão direito no arquivo.
4. Selecione **Open with Live Server**.

### Node.js

Com Node.js instalado, execute na raiz do projeto:

```bash
npx serve .
```

Depois, abra o endereço HTTP fornecido pelo servidor. O `serve.json` deixa as "URLs limpas" do `serve` ligadas só na raiz, para que `detalhe.html?tipo=&id=` não seja redirecionado sem a query.

### Testes, lint e formatação

O `package.json` existe só para as ferramentas de desenvolvimento; o site não tem build nem dependências em produção.

```bash
npm install
npm test               # node --test
npm run lint           # ESLint em js/
npm run format:check   # Prettier (as cópias geradas ficam de fora)
powershell -ExecutionPolicy Bypass -File docs/claudeia/verificar.ps1
```

A CI (`.github/workflows/ci.yml`) roda os mesmos passos em todo push e pull request.

## Requisitos

Para executar o projeto localmente, é necessário:

* navegador moderno com suporte a ES Modules;
* servidor HTTP local;
* Node.js, caso seja utilizada a opção `npx serve`;
* ou a extensão Live Server do VS Code.

Não é necessário instalar um framework ou executar um processo de build. O `npm install` só é preciso para rodar testes, lint e formatação.

## Princípios do projeto

O desenvolvimento do Career segue alguns princípios:

### Simplicidade

Evitar dependências e abstrações desnecessárias.

### Separação de responsabilidades

Dados, comportamento, apresentação e funcionalidades específicas devem permanecer organizados em módulos independentes.

### Evolução incremental

Novas funcionalidades devem ser adicionadas sem comprometer o funcionamento das existentes.

### Prática das tecnologias fundamentais

Antes de recorrer a frameworks ou bibliotecas, o projeto prioriza o domínio de:

* HTML;
* CSS;
* JavaScript;
* DOM;
* ES Modules;
* acessibilidade;
* responsividade;
* gerenciamento de estado no cliente.

## Acessibilidade

A interface possui recursos básicos de acessibilidade, incluindo:

* skip-link;
* atributos `aria-label`;
* estados `aria-expanded` e `aria-pressed` no menu;
* `aria-live` na grade de resultados e no estado da página de detalhe;
* foco visível (`:focus-visible`);
* respeito a `prefers-reduced-motion`;
* textos alternativos nas imagens.

A acessibilidade continua sendo uma área de evolução do projeto.

## Responsividade

A interface possui regras específicas para diferentes tamanhos de tela, com menu recolhível no mobile.

## Próximos passos

O que falta virou issue com o label `proximos-passos` e critérios de entrega, na ordem sugerida. O detalhe está em [`docs/ESTADO-DO-PROJETO.md`](docs/ESTADO-DO-PROJETO.md).

| Issue | Item |
| --- | --- |
| [#33](https://github.com/douglasabnovato/career/issues/33) | Acessibilidade: contraste, nome acessível e área de toque |
| [#28](https://github.com/douglasabnovato/career/issues/28) | Filtro por categoria e seção refletidos na URL |
| [#31](https://github.com/douglasabnovato/career/issues/31) | Limpar os 25 assets sem referência (cerca de 12 MB) |
| [#30](https://github.com/douglasabnovato/career/issues/30) | Lighthouse e e2e da career com relatório |
| [#32](https://github.com/douglasabnovato/career/issues/32) | Content-Security-Policy compatível com a API e o Turnstile |
| [#29](https://github.com/douglasabnovato/career/issues/29) | Currículos: imprimir, link direto e mais níveis |

Empresas, vagas e perfis novos não precisam de issue de código: entram pela API, seguindo [`docs/COMO-EVOLUIR.md`](docs/COMO-EVOLUIR.md).

---

**@douglasabnovato**
