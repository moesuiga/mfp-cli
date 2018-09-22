const program = require('commander');
const open = require('./open');
const { version } = require('../package.json');

program.version(`Hello, friend.

███╗   ███╗███████╗██████╗
████╗ ████║██╔════╝██╔══██╗
██╔████╔██║█████╗  ██████╔╝
██║╚██╔╝██║██╔══╝  ██╔═══╝
██║ ╚═╝ ██║██║     ██║
╚═╝     ╚═╝╚═╝     ╚═╝

The verion is V${version}`, '-v, --version')
  .description('Thanks to use mfp-cli');

/**
 * open a directory or a file in explorer
 */
program.command('open <path>')
  .action(open)
  .description('open a directory or a file in explorer');

program.parse(process.argv);

if (program.args.length === 0) {
  program.help();
}
