#!/bin/bash

# Build TypeScript
npm run build

# Create required directories on server
ssh root@31.97.42.47 "mkdir -p /home/studenttravelbuddy.com/public_html/node-app/wanderlust-backend/dist"

# Clear previous dist files
ssh root@31.97.42.47 "rm -rf /home/studenttravelbuddy.com/public_html/node-app/wanderlust-backend/dist/*"

# Deploy compiled files
scp -r dist/* root@31.97.42.47:/home/studenttravelbuddy.com/public_html/node-app/wanderlust-backend/dist/

# Deploy config files (without overwriting .env)
scp package.json package-lock.json root@31.97.42.47:/home/studenttravelbuddy.com/public_html/node-app/wanderlust-backend/

# Install dependencies and restart
ssh root@31.97.42.47 "cd /home/studenttravelbuddy.com/public_html/node-app/wanderlust-backend && npm install --production && pm2 restart wanderlust-backend"