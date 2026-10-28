<#
  verificar.ps1 — verificação do projeto Career (site estático, sem build).
  Uso, na RAIZ do projeto:
    powershell -ExecutionPolicy Bypass -File docs\claudeia\verificar.ps1
    powershell -ExecutionPolicy Bypass -File docs\claudeia\verificar.ps1 -Online
  Para no primeiro erro (exit 1). Avisos não param a execução.
#>
param([switch]$Online)

$ErrorActionPreference = 'Stop'
$raiz = (Get-Location).Path

function Etapa($n, $t) { Write-Host "`n[$n] $t" -ForegroundColor Cyan }
function Falha($m)     { Write-Host "  FALHOU: $m" -ForegroundColor Red; exit 1 }
function Ok($m)        { Write-Host "  OK: $m" -ForegroundColor Green }
function Aviso($m)     { Write-Host "  AVISO: $m" -ForegroundColor Yellow }

function Resolver($base, $rel) {
  $limpo = ($rel -split '[?#]')[0]
  return [System.IO.Path]::GetFullPath((Join-Path $base $limpo))
}
function EhExterno($u) { return ($u -match '^(https?:|mailto:|data:|#|//)') -or ($u -eq '') -or ($u.EndsWith('/')) }

# ---------------------------------------------------------------------------
Etapa 1 'Confere que o script roda na raiz do Career'
foreach ($f in 'index.html', 'main.js', 'js\app.js', 'css\layout.css') {
  if (-not (Test-Path $f)) { Falha "não encontrei '$f'. Rode o script na raiz do projeto career." }
}
Ok 'index.html, main.js, js\ e css\ presentes'

# ---------------------------------------------------------------------------
Etapa 2 'Confere que todo arquivo LOCAL referenciado existe (HTML, CSS, imports JS, imagens nos dados, manifest)'
$faltando = New-Object System.Collections.Generic.List[string]
$total = 0

# index.html: src/href relativos à raiz
$html = Get-Content -Raw -Encoding UTF8 'index.html'
foreach ($m in [regex]::Matches($html, '(?:src|href)\s*=\s*"([^"]*)"')) {
  $u = $m.Groups[1].Value
  if (EhExterno $u) { continue }
  $total++
  if (-not (Test-Path (Resolver $raiz $u))) { $faltando.Add("index.html -> $u") }
}

# CSS: url(...) e @import relativos à pasta css
foreach ($f in Get-ChildItem 'css' -Filter '*.css' -File) {
  $t = Get-Content -Raw -Encoding UTF8 $f.FullName
  foreach ($m in [regex]::Matches($t, 'url\(\s*["'']?([^"'')]+)["'']?\s*\)')) {
    $u = $m.Groups[1].Value
    if (EhExterno $u) { continue }
    $total++
    if (-not (Test-Path (Resolver $f.DirectoryName $u))) { $faltando.Add("css\$($f.Name) -> $u") }
  }
}

# JS: imports relativos ao arquivo; caminhos "./assets|./public" relativos à raiz (o navegador resolve pelo index.html)
$js = @(Get-Item 'main.js') + @(Get-ChildItem 'js' -Filter '*.js' -File)
foreach ($f in $js) {
  $t = Get-Content -Raw -Encoding UTF8 $f.FullName
  foreach ($m in [regex]::Matches($t, '(?:from\s+|import\s+)"(\.{1,2}/[^"]+)"')) {
    $u = $m.Groups[1].Value; $total++
    if (-not (Test-Path (Resolver $f.DirectoryName $u))) { $faltando.Add("$($f.Name) import -> $u") }
  }
  foreach ($m in [regex]::Matches($t, '"(\./(?:assets|public)/[^"]+)"')) {
    $u = $m.Groups[1].Value; $total++
    if (-not (Test-Path (Resolver $raiz $u))) { $faltando.Add("$($f.Name) -> $u") }
  }
}

# Manifest: ícones relativos à pasta public
if (Test-Path 'public\site.webmanifest') {
  $man = Get-Content -Raw -Encoding UTF8 'public\site.webmanifest' | ConvertFrom-Json
  foreach ($i in $man.icons) {
    $total++
    if (-not (Test-Path (Resolver (Join-Path $raiz 'public') $i.src))) { $faltando.Add("site.webmanifest -> $($i.src)") }
  }
}

if ($faltando.Count -gt 0) {
  $faltando | ForEach-Object { Write-Host "    $_" -ForegroundColor Red }
  Falha "$($faltando.Count) referência(s) local(is) quebrada(s) de $total"
}
Ok "$total referências locais conferidas, nenhuma quebrada"

# ---------------------------------------------------------------------------
Etapa 3 'Confere a sintaxe dos módulos JavaScript (node --check), se o Node estiver instalado'
$node = Get-Command node -ErrorAction SilentlyContinue
if (-not $node) {
  Aviso 'Node não encontrado: sintaxe JS NÃO verificada. Instale o Node LTS para cobrir esta etapa.'
} else {
  foreach ($f in $js) {
    Get-Content -Raw -Encoding UTF8 $f.FullName | node --check --input-type=module | Out-Host
    if ($LASTEXITCODE -ne 0) { Falha "erro de sintaxe em $($f.Name)" }
  }
  Ok "$($js.Count) arquivos JS sem erro de sintaxe"
}

# ---------------------------------------------------------------------------
Etapa 4 'Confere o básico de SEO e acessibilidade no index.html'
if ($html -notmatch '<html[^>]*lang="pt-BR"') { Falha 'index.html sem lang="pt-BR"' }
if ($html -notmatch '<meta\s+name="description"') { Falha 'index.html sem meta description' }
if ($html -notmatch 'aria-labelledby="company-modal-title"') { Falha 'modal sem aria-labelledby (regressão do lote 1)' }
Ok 'lang, meta description e nome acessível do modal presentes'

# ---------------------------------------------------------------------------
Etapa 5 'Avisos de qualidade (não param a execução)'
$http = Select-String -Path 'js\*.js' -Pattern 'site_url:\s*"http://' -SimpleMatch:$false
foreach ($h in $http) { Aviso "link sem https: $($h.Filename):$($h.LineNumber)" }

$textoTodo = (@($html) + @($js | ForEach-Object { Get-Content -Raw -Encoding UTF8 $_.FullName })) -join ' '
$grandes = Get-ChildItem 'assets' -Recurse -File | Where-Object { $_.Length -gt 300KB -and $textoTodo.Contains($_.Name) }
foreach ($g in $grandes) { Aviso ("imagem usada com mais de 300 KB: {0} ({1:N0} KB)" -f $g.FullName.Substring($raiz.Length + 1), ($g.Length / 1KB)) }
$usadas = Get-ChildItem 'assets' -Recurse -File | Where-Object { $textoTodo.Contains($_.Name) }
$soma = ($usadas | Measure-Object Length -Sum).Sum
Write-Host ("  INFO: {0} imagens referenciadas somam {1:N1} MB" -f $usadas.Count, ($soma / 1MB))

if ((Get-Content -Raw -Encoding UTF8 'Readme.md') -match 'Essa versão já está alinhada') { Aviso 'Readme.md voltou a ter a sobra de texto de IA no final' }

# ---------------------------------------------------------------------------
if ($Online) {
  Etapa 6 'Confere a versão publicada no GitHub Pages'
  $url = 'https://douglasabnovato.github.io/career/'
  try { $r = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 20 }
  catch { Falha "não consegui abrir $url ($($_.Exception.Message))" }
  if ($r.StatusCode -ne 200) { Falha "status $($r.StatusCode) em $url" }
  if ($r.Content -notmatch 'Career \| learnTECH') { Falha 'a página publicada não tem o título esperado' }
  Ok "$url respondeu 200 com o título esperado"

  Etapa 7 'Confere links externos dos dados (site_url e url); só avisa'
  $links = $js | ForEach-Object { Select-String -Path $_.FullName -Pattern '(?:site_url|career_url|url):\s*"(https?://[^"]+)"' -AllMatches } |
           ForEach-Object { $_.Matches } | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
  foreach ($l in $links) {
    try { $null = Invoke-WebRequest -Uri $l -Method Head -UseBasicParsing -TimeoutSec 15 -MaximumRedirection 5 }
    catch { Aviso "não respondeu bem: $l ($($_.Exception.Message))" }
  }
  Ok "$($links.Count) links externos testados (avisos acima, se houver; alguns sites bloqueiam HEAD)"
}

Write-Host "`nVerificação concluída sem erros." -ForegroundColor Green
Write-Host 'Lembrete: rode o roteiro manual em docs\claudeia\05-testes-manuais.md (servidor local: Live Server ou "npx serve .").'
exit 0
