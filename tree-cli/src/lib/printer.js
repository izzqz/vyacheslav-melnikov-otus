const fs = require('fs');
const nodePath = require('path');

const SYMBOLS = require('../constants.js');
const Counter = require('./counter.js');

// FIXME: Error: EPERM: operation not permitted

function getPrinterFunction(
    depth,
    absoluteDirPath,
    indentContext = '',
    options,
) {
  let newIndentContext;

  return function printLine(name, index, directory) {
    const isLastContent = index === directory.length - 1;
    const absoluteContentPath = nodePath.join(absoluteDirPath, name);
    const isDirectory = fs.lstatSync(absoluteContentPath).isDirectory();

    let specBranch = '';

    if (isDirectory) {
      Counter.plusDirectory();
    } else {
      Counter.plusFile();
    }

    if (isLastContent) {
      specBranch = SYMBOLS.LAST_BRANCH;
      if (isDirectory) {
        newIndentContext = indentContext + SYMBOLS.INDENT;
      }
    }

    if (!isLastContent) {
      specBranch = SYMBOLS.BRANCH;
      newIndentContext = indentContext + SYMBOLS.VERTICAL;
    }

    process.stdout.write(
        `${indentContext}${specBranch} ${name}${isDirectory ? nodePath.sep : ''}\n`,
    );

    if (isDirectory && depth < options.depth) {
      const dir = fs.readdirSync(absoluteContentPath);
      dir.forEach(
          getPrinterFunction(
              depth + 1,
              absoluteContentPath,
              newIndentContext,
              options,
          ),
      );
    }
  };
}

module.exports = getPrinterFunction;