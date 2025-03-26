import fs from 'fs';
import { ArgumentsCamelCase, Argv } from 'yargs';
import path from "path";
import chalk from "chalk";
import {Funko } from "./funko.js";
import { checkpath } from './checkpath.js';

export interface showFunko {
  usuario: string,
  id: number
}

export function showfunko (funko: showFunko) {
  const filePath = path.join(process.cwd(), `/db/${funko.usuario}/${funko.usuario}.json`);
  fs.readFile(filePath, 'utf8', (err,data)=> {
    if(err) {
      console.error(chalk.red(`Error al leer el fichero: ${err.message}`))
    }

    let funkos: Funko[] = []
    funkos = JSON.parse(data)

    const exists = funkos.some((f) => f.id === funko.id)
    if (exists) {
      const selectedFunko = funkos.find((f) => f.id === funko.id);
      if (selectedFunko) {
        console.log(chalk.green(`Nombre del Funko: ${selectedFunko.nombre}`));
        console.log(chalk.green(`Id del funko: ${selectedFunko.id}`))
        console.log(chalk.green(`Descripción: ${selectedFunko.desc}`));
        console.log(chalk.green(`Tipo: ${selectedFunko.tipo}`));
        console.log(chalk.green(`Género: ${selectedFunko.genero}`));
        console.log(chalk.green(`Franquicia: ${selectedFunko.franquicia}`));
        console.log(chalk.green(`Número: ${selectedFunko.numero}`));
        console.log(chalk.green(`Exclusivo: ${selectedFunko.exclusivo ? 'Sí' : 'No'}`));
        console.log(chalk.green(`Características especiales: ${selectedFunko.caracteristicas}`));
        if (selectedFunko.valorMercado <= 10) {
          console.log(chalk.green(`Valor de mercado: ${chalk.red(`${selectedFunko.valorMercado}€`)}`));
        } else if (selectedFunko.valorMercado <= 30) {
          console.log(chalk.green(`Valor de mercado: ${chalk.grey(`${selectedFunko.valorMercado}€`)}`));
        } else if (selectedFunko.valorMercado <= 50) {
          console.log(chalk.green(`Valor de mercado: ${chalk.magenta(`${selectedFunko.valorMercado}€`)}`));
        } else {
          console.log(chalk.green(`Valor de mercado: ${selectedFunko.valorMercado}€`));
        }
        console.log("------------------------------------------------------------");
      }
    } else {
      console.log(chalk.red('El Funko con el ID especificado no existe.'));
    }
  })
}


export const showCommand = {
  command: 'show',
  describe: 'Mostrar un funko si existe',
  builder: (yargs:Argv) => {
    return yargs
      .option('usuario', { type: 'string', demandOption: true, describe: 'Nombre del usuario' })
      .option('id', { type: 'number', demandOption: true, describe: 'ID del Funko' })
  },
  handler: (argv: ArgumentsCamelCase<showFunko>) => {
    checkpath(argv.usuario)
    const funko: showFunko = {
      usuario: argv.usuario,
      id: argv.id
    }
    setTimeout(()=> {
      showfunko(funko)
    }, 100)
  }
}