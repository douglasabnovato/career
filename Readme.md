# Career

Hub estratégico para conexões profissionais de alta performance: apresentando empresas de destaque, oportunidades desafiadoras e perfis inspiradores que colaboram ativamente na jornada de formação e evolução na carreira tech.

🔗 **Acesse a versão publicada:** [douglasabnovato.github.io/career](https://douglasabnovato.github.io/career/)

## Onde este projeto se encaixa

O Career faz parte do ecossistema **learnTECH**. Dentro da plataforma principal ([learn-tech](https://learn-tech-pied.vercel.app/)), a página `/career` funciona como uma introdução ao tema — e leva, através de uma chamada para ação, até aqui: a experiência completa, com conteúdo aprofundado e atualizado.

## O que você encontra aqui

- **Empresas** — empresas com cultura sólida e oportunidades desafiadoras
- **Oportunidades** — as melhores plataformas para buscar a próxima vaga tech
- **Devs** — referências e mentores que inspiram a comunidade

## Stack

HTML, CSS e JavaScript puros — sem framework, por decisão deliberada. Este projeto é também um espaço de prática: aprofundar o domínio dessas três tecnologias antes de recorrer a qualquer abstração.

- Módulos ES (`import` / `export`) para separar dado de lógica
- CSS modular, um arquivo por responsabilidade (`layout`, `header`, `cards`, `footer`, `banner`)
- Sem dependência de build tool — o projeto roda direto do navegador, servido por HTTP

## Funcionalidades

- Busca com debounce de 300ms, filtrando por título, categoria e localização/duração
- Tema claro/escuro, com preferência salva em `localStorage`
- Paginação por "Carregar Mais", em lotes de 6 itens
- Banner de lançamento em carrossel, com rotação automática, navegação manual e pausa ao passar o mouse
- Acessibilidade básica: skip-link, `aria-label`, `aria-live` na listagem

## Como rodar localmente

O `main.js` usa módulos ES (`type="module"`), que exigem que o projeto seja servido por HTTP — **abrir o `index.html` direto pelo navegador (protocolo `file://`) não funciona.**

Duas formas simples de servir localmente:

**Usando a extensão Live Server do VS Code:**
1. Clique com o botão direito em `index.html`
2. Selecione "Open with Live Server"

**Usando Node.js:**
```bash
npx serve .
```

## Estrutura de pastas

```
career/
├── assets/
│   ├── error/
│   ├── logo/
│   ├── thumb_good-companies/
│   ├── thumb_jobs/
│   └── thumb_perfis-dev/
├── css/
│   ├── banner.css
│   ├── cards.css
│   ├── footer.css
│   ├── header.css
│   ├── layout.css
│   └── style.css
├── js/
│   ├── banner-data.js
│   ├── good-companies.js
│   ├── jobs.js
│   └── perfis-dev.js
├── public/
├── index.html
├── main.js
└── Readme.md
```

## Próximos passos

Há itens em aberto registrados nas [issues do repositório](https://github.com/douglasabnovato/career/issues), a serem priorizados nas próximas iterações.

---

**@douglasabnovato**