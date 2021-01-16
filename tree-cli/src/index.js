const fs = require('fs');
const nodePath = require('path');

const printLinesRecursively = require('./printer');

const path = process.argv.slice(2)[0] || '.';

const rootDir = fs.readdirSync(path);
const absoluteDirPath = nodePath.join(process.cwd(), path);

rootDir.forEach(printLinesRecursively(0, absoluteDirPath));


