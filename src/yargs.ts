import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { addCommand } from './addcommand.js';


yargs(hideBin(process.argv))
  .command(addCommand.command, addCommand.describe, addCommand.builder, addCommand.handler)
  .help()
  .argv;