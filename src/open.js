const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const colors = require('colors');

const { log } = console;

function open(src) {
  let absSrc;
  if (path.isAbsolute(src)) {
    absSrc = src;
  } else {
    absSrc = path.join(process.cwd(), src);
  }
  if (!fs.existsSync(absSrc)) {
    log(colors.bgRed.white('PATHERROR: \n'), colors.red(`\t"${absSrc}" is not exists.`));
    process.exit(1);
    return;
  }
  const stat = fs.statSync(absSrc);
  if (stat.isDirectory() || stat.isFile()) {
    log(colors.cyan('OPEN: '), `"${absSrc}"`);
    spawn('explorer.exe', [absSrc]);
  } else {
    log(colors.red(`${absSrc} is not a directory or a file.
    Manually open ${absSrc}.`));
    process.exit(1);
  }
}

module.exports = open;
