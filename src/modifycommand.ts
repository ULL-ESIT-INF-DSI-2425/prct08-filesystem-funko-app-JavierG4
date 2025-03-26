import fs from 'fs';
import { ArgumentsCamelCase, Argv } from 'yargs';
import path from "path";
import chalk from "chalk";
import {Funko,FunkoTipos,FunkoGenero } from "./funko.js";
import { checkpath } from './checkpath.js';
import { AddFunko } from './addcommand.js';


export function modifyFunko(usuario:string, funko:Funko) {
  const filePath = path.join(process.cwd(), `/db/${usuario}/${usuario}.json`);
  console.log("eeeeeeeeeeeeeeeeeeeee")
  fs.readFile(filePath, 'utf8', (err,data)=> {
    if(err) {
      console.log(chalk.red(`No se pudo leer el fichero: ${err.message}`))
    }
    let Funkos: Funko[]=[]
    Funkos = JSON.parse(data)
    //Comprobar que existe ese id
    const exist = Funkos.some((f)=> f.id === funko.id)
    if(exist) {
      Funkos = Funkos.filter((f)=> f.id !== funko.id)
      Funkos.push(funko)
      fs.writeFile(filePath, JSON.stringify(Funkos, null, 2), 'utf8', (writerr)=> {
        if(writerr) {
          console.log(chalk.red(`Error al escribir en el fichero`))
        } else {
          console.log(chalk.green(`Se ha modificado el fichero correctamente`))
        }
      })
    } else {
      console.log(chalk.red(`No existe el Funko con id: ${funko.id} del usuario ${usuario}`))
    }
  })
}

export const modifyCommand = {
  command: 'modify',
  describe: 'Comando para modificar funko existente',
  builder: (yargs: Argv) => {
    return yargs
      .option('usuario', { type: 'string', demandOption: true, describe: 'Nombre del usuario' })
      .option('id', { type: 'number', demandOption: true, describe: 'ID del Funko' })
      .option('nombre', { type: 'string', demandOption: true, describe: 'Nombre del Funko' })
      .option('desc', { type: 'string', demandOption: true, describe: 'Descripción del Funko' })
      .option('tipo', { type: 'string', demandOption: true, describe: 'Tipo de Funko' })
      .option('genero', { type: 'string', demandOption: true, describe: 'Género del Funko' })
      .option('franquicia', { type: 'string', demandOption: true, describe: 'Franquicia del Funko' })
      .option('numero', { type: 'number', demandOption: true, describe: 'Número del Funko' })
      .option('exclusivo', { type: 'boolean', demandOption: true, describe: '¿Es exclusivo?' })
      .option('caracteristicas', { type: 'string', demandOption: true, describe: 'Características especiales' })
      .option('valorMercado', { type: 'number', demandOption: true, describe: 'Valor de mercado' });
  },
  handler: (argv: ArgumentsCamelCase<AddFunko>) => {
    checkpath(argv.usuario)
    const newFunko: Funko = {
      id: argv.id,
      nombre: argv.nombre,
      desc: argv.desc,
      tipo: argv.tipo as FunkoTipos,
      genero: argv.genero as FunkoGenero,
      franquicia: argv.franquicia,
      numero: argv.numero,
      exclusivo: argv.exclusivo,
      caracteristicas: argv.caracteristicas,
      valorMercado: argv.valorMercado,
    };
    modifyFunko(argv.usuario, newFunko)
  }
}
