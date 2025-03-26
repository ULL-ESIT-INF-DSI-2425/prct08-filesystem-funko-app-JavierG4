import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { addCommand } from './addcommand.js';
import { deleteCommand } from './deletecommand.js';
import { showCommand } from './showcommand.js';
import { listCommand } from './listcommand.js';
import { modifyCommand } from './modifycommand.js'; 

// Ejemplo node dist/yargs.js add --usuario "juan" --id 1 --nombre "Batman" --desc "Figura de colección de Batman" --tipo "POP" --genero "ANIMACION" --franquicia "DC Comics" --numero 01 --exclusivo true --caracteristicas no --valorMercado 25.99
//node dist/yargs.js add --usuario "manolo" --id 2 --nombre "superman" --desc "Figura de colección de Batman" --tipo "POP" --genero "ANIME" --franquicia "DC Comics" --numero 02 --exclusivo true --caracteristicas no --valorMercado 53.99

yargs(hideBin(process.argv))
  .command(addCommand.command, addCommand.describe, addCommand.builder, addCommand.handler)
  .command(deleteCommand.command, deleteCommand.describe, deleteCommand.builder, deleteCommand.handler)
  .command(showCommand.command, showCommand.describe, showCommand.builder, showCommand.handler)
  .command(listCommand.command, listCommand.describe, listCommand.builder, listCommand.handler)
  .command(modifyCommand.command, modifyCommand.describe, modifyCommand.builder, modifyCommand.handler)
  .help()
  .parse();