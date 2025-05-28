#!/bin/bash

# Enable error tracking and verbose output
set -e
set -x

# Clean up existing installation
ssh root@31.97.42.47 << 'ENDSSH'
echo "🧹 Cleaning up existing installation..."
pm2 delete all || true
rm -rf /var/www/stb-website/backend     # Remove old backend folder
rm -rf /var/www/stb-website/dist/backend # Remove any nested backend folders
rm -rf /var/www/stb-website             # Remove entire website directory
mkdir -p /var/www/stb-website/wanderlust-backend/dist
mkdir -p /var/www/stb-website/dist
chown -R www-data:www-data /var/www/stb-website
chmod -R 755 /var/www/stb-website
ENDSSH

# Store current directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
echo "📂 Working directory: $SCRIPT_DIR"

# Build frontend
echo "🏗️ Building frontend..."
npm run build || { echo "❌ Frontend build failed"; exit 1; }

# Build backend
echo "🏗️ Building backend..."
cd wanderlust-backend || { echo "❌ Cannot find backend directory"; exit 1; }
npm run build || { echo "❌ Backend build failed"; exit 1; }

# Verify builds
if [ ! -d "./dist" ]; then
    echo "❌ Backend dist directory not found"
    exit 1
fi

cd $SCRIPT_DIR
if [ ! -d "./dist" ]; then
    echo "❌ Frontend dist directory not found"
    exit 1
fi

# Deploy to VPS
echo "🚀 Deploying to VPS..."

# Sync backend files
echo "📂 Syncing backend files..."
rsync -avzP ./wanderlust-backend/dist/ root@31.97.42.47:/var/www/stb-website/wanderlust-backend/dist/ || { echo "❌ Backend dist sync failed"; exit 1; }
rsync -avzP ./wanderlust-backend/package.json ./wanderlust-backend/package-lock.json root@31.97.42.47:/var/www/stb-website/wanderlust-backend/ || { echo "❌ Backend package files sync failed"; exit 1; }

# Sync frontend files
echo "📂 Syncing frontend files..."
cd $SCRIPT_DIR
rsync -avzP ./dist/ root@31.97.42.47:/var/www/stb-website/dist/ || { echo "❌ Frontend sync failed"; exit 1; }

# Sync PM2 config
echo "📂 Syncing PM2 config..."
rsync -avzP ./ecosystem.config.js root@31.97.42.47:/var/www/stb-website/ || { echo "❌ PM2 config sync failed"; exit 1; }

# Install dependencies and start services
echo "🔄 Installing dependencies and starting services..."
ssh root@31.97.42.47 << 'ENDSSH'
set -e
cd /var/www/stb-website/wanderlust-backend
npm install --omit=dev

cd /var/www/stb-website
ls -la  # Verify ecosystem.config.js exists
pm2 delete all || true
pm2 start ecosystem.config.js --env production
pm2 save
pm2 list
ENDSSH

echo "✅ Deployment complete!"