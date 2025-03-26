import fs from 'fs';
import { ArgumentsCamelCase, Argv } from 'yargs';
import path from "path";
import chalk from "chalk";
import {Funko } from "./funko.js";
import { checkpath } from './checkpath.js';

export interface deleteFunko {
  usuario: string,
  id: number
}

export function deleteFunko(funko:deleteFunko) {
  const filePath = path.join(process.cwd(), `/db/${funko.usuario}/${funko.usuario}.json`);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(chalk.red(`Error al leer el fichero: ${err.message}`));
      return;
    }

    // Obtener los funkos
    let funkos: Funko[] = [];
    funkos = JSON.parse(data);

    const exists = funkos.some((f) => f.id === funko.id);
    if (exists) {
      funkos = funkos.filter((f) => f.id !== funko.id);
      fs.writeFile(filePath, JSON.stringify(funkos, null, 2), 'utf8', (writeErr) => {
        if (writeErr) {
          console.error(chalk.red(`Error al escribir en el fichero: ${writeErr.message}`));
        } else {
          console.log(chalk.green(`Funko eliminado correctamente: `));
        }
      });
    }
  })
}

export const deleteCommand = {
  command: 'delete',
  describe: 'Borrar un funko de un usuario',
  builder: (yargs:Argv) => {
    return yargs
      .option('usuario', { type: 'string', demandOption: true, describe: 'Nombre del usuario' })
      .option('id', { type: 'number', demandOption: true, describe: 'ID del Funko' })
  },
  handler: (argv: ArgumentsCamelCase<deleteFunko>) => {
    checkpath(argv.usuario)
    const funko: deleteFunko = {
      usuario: argv.usuario,
      id: argv.id
    }
    setTimeout(()=> {
      deleteFunko(funko)
    }, 100)
  }
}


