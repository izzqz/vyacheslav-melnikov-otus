const fs = require('fs');
const nodePath = require('path');

const printLinesRecursively = require('./lib/printer');
const Counter = require('./lib/counter');

function tree(path = '.', options) {
  const rootDir = fs.readdirSync(path);
  const absoluteDirPath = nodePath.join(process.cwd(), path);

  process.stdout.write(`${absoluteDirPath}\n`);
  rootDir.forEach(printLinesRecursively(0, absoluteDirPath, '', options));
  process.stdout.write(`${Counter.directories} directories, ${Counter.files} files\n`);
}

module.exports = tree;