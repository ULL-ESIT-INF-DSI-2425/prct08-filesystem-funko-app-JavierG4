import fs from 'fs';
import { ArgumentsCamelCase, Argv } from 'yargs';
import path from "path";
import chalk from "chalk";
import {Funko } from "./funko.js";
import { checkpath } from './checkpath.js';
import { showfunko } from './showcommand.js';


export interface listInterface {
  usuario: string
}

export function listfunkos(usuario: string) {
  const filePath = path.join(process.cwd(), `/db/${usuario}/${usuario}.json`);
  fs.readFile(filePath, 'utf8', (err,data)=> {
    if(err) {
      console.log(chalk.red(`Error leyendo el fichero: ${err.message}`))
    }

    let Funkos: Funko[] = []
    Funkos = JSON.parse(data)
    Funkos.forEach((funko, i) => {
      if (i === 0) {
      console.log(`Lista de POP'S de: ${usuario}`);
      console.log("-------------------------------------");
      }
      showfunko({ usuario: usuario, id: funko.id });
    });
  })
  
}
export const listCommand = {
  command: 'list',
  describe: 'Lista los POPS de un usuario',
  builder: (yargs: Argv)=> {
    return yargs
      .option('usuario', { type: 'string', demandOption: true, describe: 'Nombre del usuario' })
  },
  handler: (argv: ArgumentsCamelCase<listInterface>) => {
    checkpath(argv.usuario)
    setTimeout(() => {
      listfunkos(argv.usuario)
    }, 100);
  }
}