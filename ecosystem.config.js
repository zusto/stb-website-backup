module.exports = {
  apps: [{
    name: 'wanderlust-backend',
    script: '/var/www/stb-website/wanderlust-backend/dist/server.js',
    cwd: '/var/www/stb-website/wanderlust-backend',
    env_production: {
      NODE_ENV: 'production',
      PORT: 3001,
      HOST: '0.0.0.0'  // Allow external connections
    },
    watch: false,
    instances: 1,
    autorestart: true,
    max_memory_restart: '1G',
    error_log: '/var/log/pm2/wanderlust-error.log',
    out_log: '/var/log/pm2/wanderlust-out.log'
  }]
}