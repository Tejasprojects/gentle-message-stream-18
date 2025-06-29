
#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Check if .env.local exists
const envPath = path.join(__dirname, '../.env.local');
if (!fs.existsSync(envPath)) {
  console.log('⚠️  Warning: .env.local file not found!');
  console.log('📝 Please copy .env.example to .env.local and fill in your values:');
  console.log('   cp .env.example .env.local');
  console.log('');
}

// Check for common port conflicts
const checkPort = (port) => {
  return new Promise((resolve) => {
    const server = require('net').createServer();
    server.listen(port, () => {
      server.once('close', () => resolve(true));
      server.close();
    });
    server.on('error', () => resolve(false));
  });
};

async function startDev() {
  const portAvailable = await checkPort(8080);
  
  if (!portAvailable) {
    console.log('⚠️  Port 8080 is already in use!');
    console.log('🔧 Try: npx kill-port 8080');
    console.log('   Or use: npm run dev -- --port 3000');
    process.exit(1);
  }

  console.log('🚀 Starting QwiXEd360°Suite development server...');
  
  const vite = spawn('npx', ['vite'], { 
    stdio: 'inherit', 
    cwd: path.join(__dirname, '..') 
  });
  
  vite.on('error', (error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });
}

startDev();
