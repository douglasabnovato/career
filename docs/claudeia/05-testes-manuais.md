# Roteiro de testes manuais

**Preparação:** servir a raiz com o VS Code Live Server ou `npx serve .`. Não use `file://`, porque os ES Modules não carregam. Teste nesta branch e compare com a versão publicada (https://douglasabnovato.github.io/career/), que ainda está sem o lote 1. Abra o DevTools > Console para ver erros.

## 1. Carga inicial

| # | Ação | Resultado esperado | OK |
|---|---|---|---|
| 1.1 | Abrir a página com o console aberto | Nenhum erro vermelho. Aviso esperado: `[learntech-content] usando dados locais: API_URL não configurada` | [ ] |
| 1.2 | Observar o título da seção | "Carregando..." troca rápido pela seção salva (primeira visita: **Empresas Legais**) | [ ] |
| 1.3 | Contador | "8 empresas de 16" | [ ] |
| 1.4 | Rodapé | Ano atual em "© 2026 learnTECH" | [ ] |
| 1.5 | Aba do navegador | Título "Career \| learnTECH" e favicon | [ ] |

## 2. Navegação entre seções

| # | Ação | Resultado esperado | OK |
|---|---|---|---|
| 2.1 | Clicar em **Oportunidades** | "Plataformas Jobs", "8 plataformas de 16", botão do menu destacado | [ ] |
| 2.2 | Clicar em **Devs** | "Dev Profiles", "8 devs de 12" | [ ] |
| 2.3 | Clicar em **Currículos** | "Modelos de Currículos", 3 itens em accordion, "Fim da lista." | [ ] |
| 2.4 | Recarregar a página (F5) | Abre na última seção visitada | [ ] |
| 2.5 | Navegação anônima | Abre em Empresas, sem erro | [ ] |

## 3. Busca

| # | Ação | Resultado esperado | OK |
|---|---|---|---|
| 3.1 | Em Empresas, digitar `tecnologia` | Filtra após cerca de 0,3 s; contador atualiza | [ ] |
| 3.2 | Digitar `sao paulo` (sem acento) | Encontra itens com "São Paulo" | [ ] |
| 3.3 | Digitar `xyzxyz` | "Nenhuma empresa encontrada para sua busca." e "0 empresas" | [ ] |
| 3.4 | Apagar a busca | Lista completa volta | [ ] |
| 3.5 | Em Currículos, buscar `campinas` | Só o currículo de Campinas | [ ] |
| 3.6 | Trocar de seção com busca preenchida | Campo de busca limpo | [ ] |

## 4. Carregar mais

| # | Ação | Resultado esperado | OK |
|---|---|---|---|
| 4.1 | Em Empresas, clicar em **Carregar Mais** | "14 empresas de 16" | [ ] |
| 4.2 | Clicar de novo | "16 empresas de 16", botão some, "Fim da lista." aparece | [ ] |

## 5. Cards e links externos

| # | Ação | Resultado esperado | OK |
|---|---|---|---|
| 5.1 | Clicar num card comum (ex.: Rocketseat) | Abre o site em **nova aba** | [ ] |
| 5.2 | Testar 1 card de cada seção | Site correto; anotar links quebrados | [ ] |
| 5.3 | Handcom e Gabs Ferreira | Abrem (links `http://`); anotar se o navegador alertar | [ ] |
| 5.4 | Ícones GitHub, LinkedIn e Instagram no rodapé | Abrem os perfis em nova aba | [ ] |

## 6. Modal da empresa (BRQ) e oportunidades

| # | Ação | Resultado esperado | OK |
|---|---|---|---|
| 6.1 | Clicar no card **BRQ Digital Solutions** | Abre o modal (não abre aba); foco no botão × | [ ] |
| 6.2 | Conferir as seções | Sobre, Atuação (tags com "Data & Analytics" exibido com `&`), Modelo, Cultura, Desenvolvimento, Oportunidades | [ ] |
| 6.3 | Clicar na 1ª vaga | Expande com Resumo, Tecnologias, Requisitos e Diferenciais | [ ] |
| 6.4 | Clicar na 2ª vaga | A 1ª fecha e a 2ª abre (só uma aberta) | [ ] |
| 6.5 | "Ver oportunidade original" | Abre a vaga em nova aba | [ ] |
| 6.6 | "Ver carreiras" / "Visitar empresa" | Abrem brq.com/carreiras e brq.com | [ ] |
| 6.7 | Fechar com ×, com clique fora e com **Esc** | Fecha nos três casos; a página volta a rolar | [ ] |
| 6.8 | Com leitor de tela (NVDA), abrir o modal | Anuncia "BRQ Digital Solutions", diálogo (lote 1) | [ ] |

## 7. Currículos

| # | Ação | Resultado esperado | OK |
|---|---|---|---|
| 7.1 | Abrir cada um dos 3 currículos | Expande com Objetivo, Resumo, Contato, Competências, Experiência, Formação, Idiomas e Comunidade, quando houver | [ ] |
| 7.2 | Comparar o texto com a versão publicada | Idêntico (o lote 1 só adicionou escape) | [ ] |
| 7.3 | Clicar no e-mail | Abre o cliente de e-mail (`mailto:`) | [ ] |
| 7.4 | Abrir um currículo com outro aberto | O anterior fecha | [ ] |

## 8. Banner

| # | Ação | Resultado esperado | OK |
|---|---|---|---|
| 8.1 | Esperar 6 s | Troca de destaque (GeekHunter → Rocketseat → Filipe Deschamps) | [ ] |
| 8.2 | Clicar num indicador (dot) | Vai para o destaque | [ ] |
| 8.3 | Passar o mouse no banner | Rotação pausa | [ ] |
| 8.4 | Ativar "reduzir movimento" no SO | Não roda automaticamente | [ ] |
| 8.5 | Botão "Conferir" | Abre em nova aba | [ ] |

## 9. Tema claro e escuro

| # | Ação | Resultado esperado | OK |
|---|---|---|---|
| 9.1 | Clicar no sol ou lua | Alterna o tema; ícone muda | [ ] |
| 9.2 | Recarregar | Mantém o tema sem piscar | [ ] |
| 9.3 | Navegação anônima com SO em modo claro | Abre claro; com SO escuro, abre escuro | [ ] |
| 9.4 | Conferir modal e currículos nos dois temas | Contraste legível | [ ] |

## 10. Celular e responsivo (DevTools: 360, 768 e 1280 px)

| # | Ação | Resultado esperado | OK |
|---|---|---|---|
| 10.1 | Em 360 px, tocar no menu ☰ | Menu abre; `aria-expanded` vira true | [ ] |
| 10.2 | Escolher uma seção | Menu fecha sozinho | [ ] |
| 10.3 | Abrir o modal da BRQ em 360 px | Ocupa quase a tela toda; rola; × visível | [ ] |
| 10.4 | Rolagem horizontal | Não existe em nenhuma largura | [ ] |
| 10.5 | Celular real (Android/iOS) | Mesmo comportamento | [ ] |

## 11. Teclado e acessibilidade

| # | Ação | Resultado esperado | OK |
|---|---|---|---|
| 11.1 | Tab logo após carregar | Aparece "Pular para o conteúdo" | [ ] |
| 11.2 | Navegar só com Tab/Enter | Todos os botões e cards alcançáveis, com foco visível | [ ] |
| 11.3 | Lighthouse (Acessibilidade, SEO, Performance) | Anotar as notas como linha de base | [ ] |

## 12. Versão publicada

| # | Ação | Resultado esperado | OK |
|---|---|---|---|
| 12.1 | Abrir https://douglasabnovato.github.io/career/ | Carrega sem erro no console | [ ] |
| 12.2 | Após o merge, colar a URL no LinkedIn Post Inspector | Mostra `og-image-career.png` (lote 1) | [ ] |
| 12.3 | Repetir os testes 2, 6 e 9 na versão publicada | Iguais ao local | [ ] |
