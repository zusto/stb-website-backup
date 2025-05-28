#!/bin/bash

# Enable error tracking
set -e

echo "🏗️ Building backend..."
npm run build

echo "🚀 Deploying to VPS..."
rsync -avzP ./dist/ root@31.97.42.47:/var/www/stb-website/wanderlust-backend/dist/
rsync -avzP package.json package-lock.json root@31.97.42.47:/var/www/stb-website/wanderlust-backend/

echo "📦 Installing dependencies on VPS..."
ssh root@31.97.42.47 << 'ENDSSH'
cd /var/www/stb-website/wanderlust-backend
npm install --omit=dev
pm2 delete wanderlust-backend || true
cd /var/www/stb-website
pm2 start ecosystem.config.js --env production
pm2 save
ENDSSH

echo "✅ Deployment complete!"