const fs = require('fs');
const nodePath = require('path');

const getPrinterFunction = require('./lib/printer.js');
const Counter = require('./lib/counter.js');

function tree(path = '.', options) {
  const rootDir = fs.readdirSync(path);
  const absoluteDirPath = nodePath.join(process.cwd(), path);

  process.stdout.write(`${absoluteDirPath}\n`);

  rootDir.forEach(getPrinterFunction(0, absoluteDirPath, '', options));

  process.stdout.write(
      `${Counter.directories} directories, ${Counter.files} files\n`
  );
}

module.exports = tree;