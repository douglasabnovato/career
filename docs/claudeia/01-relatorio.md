# Career: relatório de revisão independente

Data: 27/10/2026 · Branch: `feature/claudeia-2026-10-27` (confirmado lendo `.git/HEAD`, sem rodar git) · Revisor: Claude (análise estática, sem executar o site)

## 1. Visão geral

| Item | Situação medida |
|---|---|
| Tipo | Site estático, HTML + CSS + JavaScript puro com ES Modules, sem build |
| Ponto de entrada | `index.html` → `main.js` (`type="module"`, usa top-level await, `main.js:12`) |
| Dependências externas | Google Fonts (Merriweather Sans + Poppins, `index.html:35-38`), Boxicons 2.1.4 via unpkg (`index.html:39`). Não há `package.json` |
| Hospedagem | GitHub Pages (`.nojekyll`, canonical `https://douglasabnovato.github.io/career/`, `index.html:12`) |
| API remota | `learntech-content` (Cloudflare Workers) **desativada**: `js/config.js:3` tem o placeholder `SEU-SUBDOMINIO`, então `js/api.js:5` define `BASE = ""` |
| Testes / CI / lint | Nenhum (sem `package.json`, sem `.github/`) |
| Tamanho total (sem `.git`) | 21 MB, sendo 20,7 MB em `assets/` |

### Arquivos e linhas por tipo (medido, sem `.git` e sem `docs/`)

| Tipo | Arquivos | Linhas |
|---|---:|---:|
| `.js` | 16 | 2.912 |
| `.css` | 8 | 1.638 |
| `.html` | 1 | 403 |
| `.md` | 1 | 330 |
| `.jpg` | 64 | n/a |
| `.png` | 13 | n/a |
| outros (`.ico`, `.webp`, `.webmanifest`, `.nojekyll`) | 4 | n/a |

### Conteúdo (medido nos arquivos de dados)

| Seção | Fonte | Itens |
|---|---|---:|
| Empresas | `js/good-companies.js` | 16 (só a BRQ tem modal de detalhes) |
| Plataformas Jobs | `js/jobs.js` | 16 |
| Dev Profiles | `js/perfis-dev.js` | 12 |
| Currículos | `js/curriculos.js` | 3 |
| Oportunidades de empresa | `js/company-opportunities.js` | 3, todas da BRQ |
| Destaques do banner | `js/banner-data.js:37-41` | 3 |

### Objetivo e regras deduzidas (inferido · confirmar)

| # | Dedução | Evidência |
|---|---|---|
| R1 | Objetivo: curadoria de carreira tech (empresas, plataformas de vagas, referências, modelos de currículo) para devs iniciantes e pessoas em transição | `Readme.md`, `index.html:10` |
| R2 | A identificação (nome e e-mail, sem login) via `sdk/identificacao.js` é regra de negócio para medir acesso ao ecossistema. **Hoje está inativa** porque a API não está configurada | `js/api.js:32-42`, `js/config.js:3`, `main.js:10` |
| R3 | O site tem que funcionar sem a API: o catálogo remoto é opcional e os dados locais servem de fallback | `js/catalog.js`, `main.js:11-21` |
| R4 | A última seção visitada é lembrada; a seção padrão é "Empresas" | `js/app.js:16,114-123` |
| R5 | A primeira página mostra 8 itens e cada "Carregar mais" acrescenta 6 | `js/app.js:31-32` |
| R6 | Só empresas com detalhe curado abrem modal (hoje fixo em `id === "brq"`) | `js/app.js:197` |
| R7 | Os currículos são exemplos fictícios (e-mails `@example.com`), e não pessoas reais | `js/curriculos.js:18` e similares |

## 2. Avaliação por área

| Área | Nota | Resumo |
|---|---:|---|
| Objetivo | 7 | Cumpre o papel de catálogo curado. O "mapeamento de vagas" ainda é raso (3 vagas, 1 empresa) e o robô de vagas não existe |
| Eficiência de produto digital | 6 | Fluxo simples e busca boa. A medição de acesso está desligada, a ordem de navegação não bate com a seção padrão e há conteúdo sem data |
| Performance de software | 5 | São 8,5 MB de imagens referenciadas e thumbs em resolução de banner. A cadeia de CSS por `@import` bloqueia a renderização |
| UX design | 7 | Tema claro e escuro sem flash, skip-link, reduced-motion e responsivo. O modal não prende o foco e os rótulos misturam inglês e português |
| Engenharia | 5 | Módulos bem separados e fallbacks pensados. Faltam testes, CI e lint, e o `innerHTML` não escapava dados (corrigido no lote 1) |

### 2.1 Objetivo: 7/10

| Pontos fortes | Falhas |
|---|---|
| Curadoria clara em 4 seções, com texto de apoio por seção (`js/app.js:55-89`) | "Oportunidades" no menu leva a *plataformas* de vagas, não a vagas (`index.html:100`, `js/app.js:65-71`) |
| Currículos de exemplo são um diferencial para o público iniciante | Vagas reais existem só dentro do modal da BRQ (3 itens) |
| Integração prevista com o ecossistema learnTECH (catálogo e identificação) | Público-alvo não declarado no site (inferido · confirmar) |

### 2.2 Eficiência de produto digital: 6/10

| Pontos fortes | Falhas |
|---|---|
| Busca sem acento, com debounce de 300 ms (`js/app.js:369-375`, `js/utils.js:4`) | **A medição de acesso (R2) está desligada em produção**: `config.js:3` ainda tem o placeholder |
| Contador "X de Y" e "Fim da lista" | O menu começa por "Oportunidades", mas a seção padrão é "Empresas" (`js/app.js:20,118`) |
| Banner tolera um item renomeado (`banner-data.js:10-26`) | Campo `duration` com valores genéricos ("Atualizado", "Global"), sem data de revisão (`js/jobs.js:9,16,23`) |
| Fallback local quando a API falha | 2 links `http://` sem TLS: `js/good-companies.js:85`, `js/perfis-dev.js:18` |
| | Nenhum link quebrado entre arquivos locais (61 referências checadas). Links externos não foram testados, porque a rede do dono não foi usada |

### 2.3 Performance de software: 5/10

| Pontos fortes | Falhas |
|---|---|
| `loading="lazy"` e `decoding="async"` nos cards (`index.html:156`) | 46 imagens referenciadas somam **8.474.469 bytes** (média de cerca de 184 KB). Exemplo: `coodesh.jpg` tem 1640×922 e o card tem 180 px de altura (`css/cards.css:35`) |
| Sem framework: JS total de cerca de 109 KB sem minificar | O logo `logo-career.png` (215.667 bytes, 500×500) carrega sem lazy no header, exibido a 40 px |
| Timeout de 5 s no fetch da API (`js/api.js:6`) | 26 imagens não referenciadas somam 12.612.116 bytes. Elas pesam no repositório e no deploy, não no usuário |
| | O CSS de `company-modal.css` entra por `@import` em `layout.css:4` **e** em `style.css:4`. É uma cadeia serial que bloqueia a renderização, e o comentário de `style.css:2-3` diz o contrário |
| | O CSS inteiro do Boxicons (unpkg) bloqueia a renderização para usar poucos ícones |
| | Espera fixa de até 1,5 s pela API antes do primeiro render quando ela estiver ativa (`main.js:8,12`) |

### 2.4 UX design: 7/10

| Pontos fortes | Falhas |
|---|---|
| Script inline aplica o tema antes do paint, com try/catch (`index.html:49-59`) | Modal sem *focus trap* e sem devolver o foco ao card ao fechar (`js/company-modal.js:190-196`) |
| Skip-link, `aria-pressed`, `aria-live` na lista e `prefers-reduced-motion` | Banner sem botão de pausa visível (pausa só com foco ou hover, `js/banner.js:75-78`) |
| Breakpoints em 600, 768 e 860 px | Rótulos misturam idiomas: "CONNECT WITH US" (`index.html:230`), "Dev Profiles", "Tech Jobs" |
| Imagem quebrada cai no logo (`js/app.js:219-225`) | O H1 inicial é "Carregando..." (`index.html:145`), o que é ruim para SEO e leitores de tela se o JS falhar |
| | O card da BRQ é `<a href="#" target="_blank">`: o clique do meio abre uma aba vazia |
| | O diálogo não tinha nome acessível (corrigido no lote 1 com `aria-labelledby`) |

### 2.5 Engenharia: 5/10

| Pontos fortes | Falhas |
|---|---|
| ES Modules com separação de dados, estado, UI e tema | Zero testes, sem CI, sem lint, sem `package.json` |
| `localStorage` já protegido com try/catch (`js/app.js:115-122,276-280`, `js/theme.js:21-25`) | `innerHTML` com dados sem escape em `company-modal.js` e `curriculos-render.js` (risco de XSS se os dados vierem da API). **Corrigido no lote 1** |
| `escapar()` já existia e era usado no banner | `usarCatalogo` quebraria o init se a API devolvesse `destaques` nulo ou listas fora do formato. **Corrigido no lote 1** |
| Fallback para os dados locais | O modal sempre lê `companies` local, mesmo com o catálogo remoto ativo (`js/company-modal.js:1,145`) |
| | Regra do modal fixa em `item.id === "brq"` (`js/app.js:197`) |
| | O README terminava com uma sobra de resposta de IA ("Essa versão já está alinhada...") e a estrutura de pastas estava incompleta. **Corrigido no lote 1** |
| | `JSON.parse` não é usado no código (medido), então não houve nada a proteger |

## 3. Falhas em ordem de gravidade

### Engenharia

| # | Falha | Gravidade | Situação |
|---|---|---|---|
| E1 | Dados interpolados em `innerHTML` sem escape (modal e currículos) | Alta, se a API for ligada | Executado (L1-04) |
| E2 | Sem rede de segurança: sem testes, sem CI, sem verificação de links | Alta | `verificar.ps1` entregue; CI proposto |
| E3 | `usarCatalogo` sem validação, com risco de a página ficar em "Carregando..." | Média | Executado (L1-02, L1-03) |
| E4 | Imagens 4 a 10 vezes maiores que o tamanho exibido (8,5 MB) | Média | Proposto |
| E5 | `@import` duplicado e serial de `company-modal.css` | Média | Proposto (mexe na ordem da cascata) |
| E6 | Modal sem focus trap e sem retorno de foco | Média | Proposto |
| E7 | Modal ignora o catálogo remoto | Baixa | Proposto |
| E8 | `og:image` relativo: redes sociais não resolvem | Baixa | Executado (L1-01) |
| E9 | README com sobra de texto e estrutura incompleta | Baixa | Executado (L1-06) |

### Decisão de produto (não executar sem aprovação)

| # | Tema | Proposta (aperfeiçoar, nunca remover) |
|---|---|---|
| P1 | Identificação e medição de acesso desligadas | Configurar `API_URL` com o endereço real do Worker, para religar o SDK de identificação e o catálogo remoto. Depois, medir a taxa de preenchimento |
| P2 | Rótulo "Oportunidades" leva a plataformas | Avaliar renomear para "Plataformas de vagas" ou criar uma seção real de vagas (base para o robô Playwright) |
| P3 | Seção padrão "Empresas" e menu começando por "Oportunidades" | Alinhar a ordem ou o padrão |
| P4 | Modal só para a BRQ | Generalizar para qualquer empresa com o campo `about` preenchido |
| P5 | Idiomas misturados nos rótulos | Padronizar para PT-BR |
| P6 | Campo `duration` genérico | Trocar por "revisado em mês/ano" |
| P7 | Links `http://` (Handcom, Gabs Ferreira) | Confirmar se existe versão `https` |
| P8 | 26 imagens não usadas (12,6 MB) | Decidir se ficam (uso futuro) ou saem do repositório. Nada foi apagado |
| P9 | Currículos com telefone e e-mail | Confirmar que são fictícios (R7). Se não forem, há risco LGPD |
