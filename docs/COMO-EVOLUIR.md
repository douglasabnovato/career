# Como evoluir o career

Guia curto para mudar o site com segurança. Empresas, vagas, perfis, destaques e modelos de currículo **não nascem aqui**: eles entram pela API, em `learntech-content` (veja `../learntech-content/docs/COMO-EVOLUIR.md`, seção 3).

## 1. O que é
- Site estático em JavaScript puro (sem build), publicado no GitHub Pages (`douglasabnovato.github.io/career`) a partir da `main`.
- Os dados vêm de `/v1/career/...` da API. Sem API, o site usa as cópias geradas em `js/`.

## 2. Onde fica cada coisa
| Arquivo | Papel |
|---|---|
| `index.html`, `main.js`, `js/app.js`, `js/catalog.js` | Catálogo com busca, filtro por categoria e seções (empresas, vagas, perfis) |
| `js/filtro-url.js` | Seção e categoria na URL (`?secao=empresas|vagas|perfis|curriculos&categoria=`), funções puras com teste |
| `detalhe.html`, `js/detalhe.js` | Página de detalhe (`?tipo=empresas|vagas|perfis&id=<slug>`; o formato antigo com `#` continua aceito), com canonical e Open Graph |
| `js/curriculos.js` (gerado) e `js/curriculos-render.js` | Modelos de currículo fictícios |
| `js/api.js`, `js/config.js` | Endereço da API e SDK de identificação |
| `js/utils.js` | `urlSegura` (só `https`, `http`, `mailto` e caminho relativo) e utilidades |
| `js/good-companies.js`, `js/jobs.js`, `js/perfis-dev.js`, `js/destaques.js`, `js/curriculos.js` | **Gerados** pela API (`npm run copias` em `learntech-content`). Não edite à mão; estão no `.prettierignore` |
| `404.html` | Página de erro do GitHub Pages |
| `sitemap.xml` | **Gerado** pela API (`npm run sitemaps`) |
| `docs/claudeia/verificar.ps1` | Verificação estática que a CI roda |

## 3. Quando chegar conteúdo novo
1. O item entra em `learntech-content/content/career/<recurso>.json`. Empresa, vaga ou perfil com página própria precisa de `slug` e `detalhe`, com fontes de 2 domínios.
2. Lá: `npm run validar`, `npm run copias` e `npm run sitemaps`.
3. Aqui: `npm test && npm run lint && npm run format:check`, depois commit só das cópias e do sitemap.

## 4. Quando mudar o site
- **Link vindo de dado:** sempre passe por `urlSegura` antes de pôr no `href`.
- **Detalhe:** links novos usam `detalhe.html?tipo=&id=`, igual ao sitemap e ao canonical.
- **Formatação:** `npm run format:check` é obrigatório na CI (Prettier só nos arquivos próprios).
- **Modal de identificação:** obrigatório hoje. Mudar isso é decisão do autor (issue na API).

## 5. Comandos
| Comando | Para quê |
|---|---|
| `npx serve .` | Servidor local (o `serve.json` mantém a query do detalhe) |
| `npm test` | `node --test` (21 testes em 10/11/2026) |
| `npm run lint` / `npm run format:check` | ESLint e Prettier (obrigatórios na CI) |
| `powershell -ExecutionPolicy Bypass -File docs/claudeia/verificar.ps1` | Mesma verificação estática da CI |

## 6. Estabilidade: antes de dar por pronto
- [ ] Testes, lint, format:check e `verificar.ps1` verdes.
- [ ] CI verde na branch; feature → `developer-mvp-2026-2` → `main` (`../learntech-content/docs/processo/fluxo-git.md`).
- [ ] "pages build and deployment" verde com o commit da `main`.
- [ ] `npm run e2e` em `learntech-content` sem falha nos testes da career.

## 7. Documentos
- `Readme.md`: visão geral. `docs/README.md`: engenharia.
- `docs/claudeia/`: histórico datado, com o diagnóstico de MVP e o relatório de 03/11/2026.
- `CLAUDE.md`: instruções para o Claude. Contrato do conteúdo deste site: `../learntech-content/docs/contratos/career.md`.
- `docs/ESTADO-DO-PROJETO.md`: o que fizemos, como está hoje e o que queremos fazer, com as issues em ordem.
- Próximos passos: issues com a label `proximos-passos`.
