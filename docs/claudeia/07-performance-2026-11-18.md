# Performance do carregamento: LCP do modal de identificação (18/11/2026)

Branch `feature/tasks-18-11-2026`, ligada à issue #30. A medição foi feita no site servido localmente (`vite preview` da pasta), com dados e SDK da API de produção, usando Lighthouse 12 no perfil móvel padrão. Rodei a página antes e depois da mudança, com o código antigo guardado por `git stash`.

## O que mudou

| Mudança | Por quê |
|---|---|
| O CSS do Google Fonts e o do Boxicons entram com `media="print"` e `data-assincrono`, e o `js/estilos-assincronos.js` troca para `media="all"` quando eles chegam. Há um `<noscript>` de reserva | Os dois bloqueavam a renderização por cerca de 950 ms cada. A CSP não aceita `onload` inline, por isso a troca fica num arquivo |
| O SDK de identificação passou a estar direto no HTML (`<script id="learntech-sdk" defer>`) | O modal é o LCP da primeira visita. Antes, o SDK só era injetado depois do `main.js` e dos módulos de dados. O `carregarIdentificacao()` vê o `id` e não injeta de novo |
| O logo virou `assets/logo/logo-career-320.webp` (18 KB), no lugar do PNG de 500 × 500 px (211 KB) | O logo aparece com 40 px (160 px no detalhe) e disputava a banda com o modal. O PNG continua no repositório porque a cópia gerada `good-companies.js` ainda aponta para ele |

Páginas tocadas: `index.html`, `detalhe.html` e `404.html` (nesta, só o CSS assíncrono), além de `js/app.js`, `js/banner.js` e `js/detalhe.js` (o logo de reserva).

## Medição (home, móvel)

| | Performance | LCP | FCP | CLS |
|---|---|---|---|---|
| Antes (2 rodadas) | 75 e 83 | 7,6 e 4,6 s | 1,8 s | 0,005 |
| Só CSS assíncrono e SDK no HTML (3 rodadas) | 93 a 94 | 3,0 a 3,2 s | 1,5 s | 0,006 |
| Com o logo em WebP (3 rodadas) | 96, 97 e 98 | 2,7, 2,5 e 2,3 s | 1,5 s | 0,006 |
| Detalhe (`?tipo=empresa&id=ifood`) | 96 | 2,7 s | 1,2 s | 0,006 |

O LCP mediano da home ficou em 2,5 s, dentro da meta.
