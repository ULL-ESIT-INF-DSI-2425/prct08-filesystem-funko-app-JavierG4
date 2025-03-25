import fs from 'fs';
import { Argv } from 'yargs';
import path from "path";
import { Funko, FunkoTipos, FunkoGenero } from "./funko.js";


export interface AddFunko {
  usuario: string,
  id: number,
  nombre: string,
  desc: string,
  tipo: FunkoTipos,
  genero: FunkoGenero,
  franquicia: string,
  numero: number,
  exclusivo: boolean,
  caracteristicas: boolean,
  valorMercado: number
}

export const addCommand = {
  command: 'add',
  describe: 'Añadir un nuevo Funko a la colección',
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
      .option('caracteristicas', { type: 'boolean', demandOption: true, describe: 'Características especiales' })
      .option('valorMercado', { type: 'number', demandOption: true, describe: 'Valor de mercado' });
  },
  handler: (argv: AddFunko) => {
    const userDir = path.join(__dirname, 'data', argv.usuario);

    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }

    const funkoPath = path.join(userDir, `${argv.id}.json`);

    if (fs.existsSync(funkoPath)) {
      console.error('Ya existe un Funko con este ID.');
      return;
    }

    const newFunko: AddFunko = {
      usuario: argv.usuario,
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

    fs.writeFileSync(funkoPath, JSON.stringify(newFunko, null, 2));
    console.log('¡Funko añadido con éxito!');
  },
};