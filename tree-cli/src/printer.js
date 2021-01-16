const fs = require('fs');
const nodePath = require('path');

const SYMBOLS = require('./constants');

function printLinesRecursively(depth, absoluteDirPath, indentContext = '') {
  let newIndentContext;

  return function printLine(name, index, directory) {
    const isLastContent = index === directory.length - 1;
    const absoluteContentPath = nodePath.join(absoluteDirPath, name);
    const isDirectory = fs.lstatSync(absoluteContentPath).isDirectory();

    let specSymbol = '';

    if (isLastContent) {
      specSymbol = SYMBOLS.LAST_BRANCH;
    }
    if (!isLastContent) {
      specSymbol = SYMBOLS.BRANCH;
      newIndentContext = indentContext + SYMBOLS.VERTICAL;
    }

    process.stdout.write(`${indentContext}${specSymbol} ${name}\n`);

    if (isDirectory && isLastContent) {
      newIndentContext = indentContext + SYMBOLS.INDENT;
    }

    if (isDirectory) {
      const dir = fs.readdirSync(absoluteContentPath);
      dir.forEach(
        printLinesRecursively(depth + 1, absoluteContentPath, newIndentContext),
      );
    }
  };
}

module.exports = printLinesRecursively;