# deploy.ps1 — Ручной деплой AIPA на Cloudflare Pages
# Запуск: .\deploy.ps1
# При первом запуске откроется браузер для авторизации в Cloudflare.

Write-Host "🚀 AIPA Deployment Script" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan

# --- 1. Build aipa-webapp ---
Write-Host "`n[1/3] Building aipa-webapp (Next.js)..." -ForegroundColor Yellow
Set-Location "$PSScriptRoot\aipa-webapp"
npm run build
if ($LASTEXITCODE -ne 0) { Write-Host "❌ aipa-webapp build failed!" -ForegroundColor Red; exit 1 }
Write-Host "✅ aipa-webapp built successfully." -ForegroundColor Green

# Deploy aipa-webapp
Write-Host "Deploying aipa-webapp to Cloudflare Pages..." -ForegroundColor Yellow
npx wrangler pages deploy out --project-name=ai-predict-arena --commit-dirty=true
if ($LASTEXITCODE -ne 0) { Write-Host "❌ aipa-webapp deploy failed!" -ForegroundColor Red; exit 1 }
Write-Host "✅ aipa-webapp deployed!" -ForegroundColor Green

# --- 2. Build aipa-admin ---
Write-Host "`n[2/3] Building aipa-admin (Vite)..." -ForegroundColor Yellow
Set-Location "$PSScriptRoot\aipa-admin"
npm run build
if ($LASTEXITCODE -ne 0) { Write-Host "❌ aipa-admin build failed!" -ForegroundColor Red; exit 1 }
Write-Host "✅ aipa-admin built successfully." -ForegroundColor Green

# Deploy aipa-admin
Write-Host "Deploying aipa-admin to Cloudflare Pages..." -ForegroundColor Yellow
npx wrangler pages deploy dist --project-name=aipa-admin --commit-dirty=true
if ($LASTEXITCODE -ne 0) { Write-Host "❌ aipa-admin deploy failed!" -ForegroundColor Red; exit 1 }
Write-Host "✅ aipa-admin deployed!" -ForegroundColor Green

# --- 3. Build aipa-tapbot-front ---
Write-Host "`n[3/3] Building aipa-tapbot-front (Vite)..." -ForegroundColor Yellow
Set-Location "$PSScriptRoot\aipa-tapbot-front"
npm run build
if ($LASTEXITCODE -ne 0) { Write-Host "❌ aipa-tapbot-front build failed!" -ForegroundColor Red; exit 1 }
Write-Host "✅ aipa-tapbot-front built successfully." -ForegroundColor Green

# Deploy aipa-tapbot-front
Write-Host "Deploying aipa-tapbot-front to Cloudflare Pages..." -ForegroundColor Yellow
npx wrangler pages deploy dist --project-name=aipa-tapbot --commit-dirty=true
if ($LASTEXITCODE -ne 0) { Write-Host "❌ aipa-tapbot-front deploy failed!" -ForegroundColor Red; exit 1 }
Write-Host "✅ aipa-tapbot-front deployed!" -ForegroundColor Green

# --- Done ---
Set-Location $PSScriptRoot
Write-Host "`n🎉 All deployments complete!" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host "🌐 WebApp:  https://ai-predict-arena.pages.dev" -ForegroundColor White
Write-Host "🛡️ Admin:   https://aipa-admin.pages.dev" -ForegroundColor White
Write-Host "🤖 Tapbot:  https://aipa-tapbot.pages.dev" -ForegroundColor White
