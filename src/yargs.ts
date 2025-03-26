import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { addCommand } from './addcommand.js';
import { deleteCommand } from './deletecommand.js';

// Ejemplo node dist/yargs.js add --usuario "juan" --id 1 --nombre "Batman" --desc "Figura de colección de Batman" --tipo "POP" --genero "DC" --franquicia "DC Comics" --numero 01 --exclusivo true --caracteristicas false --valorMercado 25.99

yargs(hideBin(process.argv))
  .command(addCommand.command, addCommand.describe, addCommand.builder, addCommand.handler)
  .command(deleteCommand.command, deleteCommand.describe, deleteCommand.builder, deleteCommand.handler)
  .help()
  .parse();