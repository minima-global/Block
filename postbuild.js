const fs = require('fs');
const packageJson = require('./package.json');

const dAppConf = fs.readFileSync('./build/dapp.conf', 'utf-8');
fs.writeFileSync('./build/dapp.conf', dAppConf.replace('{{version}}', packageJson.version));
