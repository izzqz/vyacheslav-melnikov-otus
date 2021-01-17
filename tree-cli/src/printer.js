const fs = require('fs');
const nodePath = require('path');

const SYMBOLS = require('./constants');

function printLinesRecursively(
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
        `${indentContext}${specBranch} ${name}${isDirectory ? '/' : ''}\n`,
    );

    if (isDirectory && depth < options['max-depth']) {
      const dir = fs.readdirSync(absoluteContentPath);
      dir.forEach(
          printLinesRecursively(
              depth + 1,
              absoluteContentPath,
              newIndentContext,
              options,
          ),
      );
    }
  };
}

module.exports = printLinesRecursively;