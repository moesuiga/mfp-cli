const program = require('commander');
const build = require('./build');
const version = require('../package.json').version

program.version(`Hello, friend.

███╗   ███╗███████╗██████╗
████╗ ████║██╔════╝██╔══██╗
██╔████╔██║█████╗  ██████╔╝
██║╚██╔╝██║██╔══╝  ██╔═══╝
██║ ╚═╝ ██║██║     ██║
╚═╝     ╚═╝╚═╝     ╚═╝

the verion is V${version}`, '-v, --version')
  .description('Thanks to use mfp-cli');


program.command('build <dir> [output]')
  .description('build a dir')
  .action(build)

program.parse(process.argv);

if (program.args.length === 0) {
  program.help()
}
