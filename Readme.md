# Career

*Hub* estratégico para conexões profissionais de alta performance: apresentando empresas de destaque, oportunidades desafiadoras e perfis inspiradores que colaboram ativamente na jornada de formação e evolução na carreira tech.

O **Career** faz parte do ecossistema **learnTECH** e foi desenvolvido como uma experiência independente para exploração de carreira no mercado de tecnologia.

## Visão geral

O projeto organiza conteúdos relacionados à carreira tech em três áreas principais:

* **Empresas** — empresas selecionadas por sua relevância, cultura, atuação e potencial de desenvolvimento profissional.
* **Plataformas Jobs** — plataformas e serviços utilizados para encontrar oportunidades profissionais na área de tecnologia.
* **Dev Profiles** — desenvolvedores, referências e profissionais que podem contribuir para a formação e evolução da comunidade.

A interface foi projetada para permitir navegação simples, busca rápida e exploração progressiva dos conteúdos.

## Publicação

A aplicação possui uma versão publicada no GitHub Pages:

**douglasabnovato.github.io/career**

O projeto também está integrado ao ecossistema **learnTECH**, onde a área de carreira funciona como ponto de entrada para conteúdos relacionados ao desenvolvimento profissional.

## Funcionalidades

### Navegação por seções

A aplicação possui três seções principais:

* Empresas
* Plataformas Jobs
* Dev Profiles

A seção selecionada é armazenada no `localStorage`, permitindo que a aplicação preserve a última área visitada.

### Busca

A busca funciona de forma dinâmica e possui **debounce de 300 ms** para evitar processamento excessivo durante a digitação.

Os resultados podem ser filtrados por:

* título;
* categoria;
* localização;
* duração, quando aplicável.

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

* rotação automática;
* navegação manual;
* indicadores de posição;
* pausa durante interação com o mouse.

Os dados dos destaques são organizados separadamente da lógica de apresentação.

### Detalhes de empresas

Empresas que possuem informações detalhadas podem abrir uma experiência de visualização em **modal**, em vez de direcionar imediatamente para o site externo.

O modal apresenta informações como:

* nome da empresa;
* localização;
* categoria;
* apresentação;
* descrição;
* áreas de atuação;
* modelo de trabalho;
* cultura;
* desenvolvimento profissional;
* oportunidades disponíveis.

A empresa BRQ Digital Solutions possui atualmente esse fluxo de detalhes.

### Oportunidades profissionais

As oportunidades associadas a uma empresa são apresentadas dentro do modal por meio de um **accordion**.

Cada oportunidade pode apresentar:

* título;
* localização;
* modelo de trabalho;
* resumo;
* descrição;
* tecnologias;
* requisitos;
* diferenciais;
* link para a oportunidade original.

Somente uma oportunidade permanece expandida por vez.

Quando uma empresa não possui oportunidades cadastradas, o sistema informa que não existem oportunidades disponíveis.

### Links externos

Os links para sites das empresas, páginas de carreira e oportunidades originais são mantidos separados da experiência interna do Career.

Quando aplicável, esses links são abertos em uma nova aba.

## Arquitetura

O projeto utiliza **HTML, CSS e JavaScript puros**, sem framework ou ferramenta de build.

Essa escolha é deliberada: o Career também funciona como espaço de prática e aprofundamento das tecnologias fundamentais da web antes da adoção de abstrações ou frameworks.

### JavaScript

O projeto utiliza **ES Modules**, permitindo separar responsabilidades entre dados, estado, interface e funcionalidades.

Principais módulos:

* `main.js` — ponto de entrada da aplicação.
* `app.js` — estado global, renderização, navegação, busca e paginação.
* `catalog.js` — carregamento e gerenciamento do catálogo.
* `api.js` — comunicação e identificação relacionadas à API.
* `good-companies.js` — dados das empresas.
* `company-modal.js` — abertura, preenchimento e fechamento do modal de empresas.
* `company-opportunities.js` — dados das oportunidades associadas às empresas.
* `jobs.js` — dados das plataformas de empregos.
* `perfis-dev.js` — dados dos perfis de desenvolvedores.
* `banner-data.js` — dados utilizados pelos destaques do banner.
* `banner.js` — comportamento do banner.
* `theme.js` — gerenciamento do tema visual.
* `utils.js` — funções utilitárias utilizadas pela aplicação.

### CSS

O CSS é organizado por responsabilidade.

Os arquivos principais incluem:

* `layout.css` — estrutura geral e distribuição da página.
* `header.css` — cabeçalho e navegação.
* `cards.css` — componentes de cards.
* `banner.css` — banner e seus controles.
* `footer.css` — rodapé.
* `company-modal.css` — modal de empresas, oportunidades e accordion.
* `style.css` — estilos gerais da aplicação.

## Catálogo de dados

O Career possui uma estrutura de dados local utilizada como base da aplicação.

Além disso, o projeto possui suporte ao carregamento de um **catálogo remoto**.

Quando o catálogo remoto está disponível, os dados de:

* empresas;
* oportunidades/plataformas;
* perfis;
* destaques;

podem ser utilizados pela aplicação.

Existe também um mecanismo de espera inicial para permitir que a interface seja apresentada rapidamente enquanto o catálogo remoto é carregado.

Caso o catálogo remoto não esteja disponível inicialmente, a aplicação utiliza os dados locais e pode atualizar a interface quando os dados remotos forem carregados.

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
│   ├── company-modal.css
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
│   ├── company-modal.js
│   ├── company-opportunities.js
│   ├── good-companies.js
│   ├── jobs.js
│   ├── perfis-dev.js
│   ├── theme.js
│   └── utils.js
│
├── public/
│
├── index.html
├── main.js
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

Depois, abra o endereço HTTP fornecido pelo servidor.

## Requisitos

Para executar o projeto localmente, é necessário:

* navegador moderno com suporte a ES Modules;
* servidor HTTP local;
* Node.js, caso seja utilizada a opção `npx serve`;
* ou a extensão Live Server do VS Code.

Não é necessário instalar um framework ou executar um processo de build.

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
* estados `aria-expanded`;
* `aria-hidden` no modal;
* `role="dialog"` no modal;
* `aria-modal`;
* navegação por teclado com fechamento do modal através da tecla `Escape`;
* textos alternativos nas imagens;
* indicação semântica de estados da interface.

A acessibilidade continua sendo uma área de evolução do projeto.

## Responsividade

A interface possui regras específicas para diferentes tamanhos de tela.

O modal de empresas também possui comportamento adaptado para dispositivos menores, utilizando praticamente toda a área disponível em telas de até 600px.

## Próximos passos

A evolução do Career continuará sendo organizada de forma incremental.

Possíveis próximos ciclos incluem:

* ampliar o catálogo de empresas;
* ampliar o catálogo de oportunidades;
* ampliar os perfis de desenvolvedores;
* melhorar a experiência de acessibilidade;
* aprimorar o sistema de oportunidades;
* evoluir a integração com o catálogo remoto;
* melhorar filtros e mecanismos de busca;
* aprimorar a experiência mobile;
* adicionar novas informações relevantes sobre empresas e carreira.

Itens específicos podem ser acompanhados através das **issues do repositório**.

---

**@douglasabnovato**

```

Essa versão já está alinhada com a arquitetura atual que você me passou, principalmente com **modal, accordion de oportunidades, módulos JS, catálogo remoto e estrutura real de pastas**.
```
