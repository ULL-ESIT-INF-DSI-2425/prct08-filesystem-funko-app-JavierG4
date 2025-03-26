import fs from 'fs';
import { ArgumentsCamelCase, Argv } from 'yargs';
import path from "path";
import chalk from "chalk";
import { Funko,FunkoTipos, FunkoGenero } from "./funko.js";
import { checkpath } from './checkpath.js';

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
  caracteristicas: string,
  valorMercado: number
}

function addFunko(funko: Funko, usuario: string) {
  const filePath = path.join(process.cwd(), `/db/${usuario}/${usuario}.json`);
  const globalIdsPath = path.join(process.cwd(), `/db/global_ids.json`);

  // Leer el fichero global de IDs
  fs.readFile(globalIdsPath, 'utf8', (err, globalData) => {
    let globalIds: number[] = [];
    if (!err) {
      globalIds = JSON.parse(globalData);
    }

    if (globalIds.includes(funko.id)) {
      console.error(chalk.red(`Error: El ID ${funko.id} ya está en uso por otro usuario.`));
      return;
    }

    // Leer el fichero del usuario
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
        console.error(chalk.red(`Error: Ya existe un Funko con el ID ${funko.id} para este usuario.`));
        return;
      }

      // Añadir el nuevo Funko al array
      funkos.push(funko);

      // Actualizar el fichero del usuario
      fs.writeFile(filePath, JSON.stringify(funkos, null, 2), 'utf8', (writeErr) => {
        if (writeErr) {
          console.error(chalk.red(`Error al escribir en el fichero: ${writeErr.message}`));
        } else {
          console.log(chalk.green(`Funko añadido correctamente: ${funko.nombre}`));

          // Actualizar el fichero global de IDs
          globalIds.push(funko.id);
          fs.writeFile(globalIdsPath, JSON.stringify(globalIds, null, 2), 'utf8', (globalWriteErr) => {
            if (globalWriteErr) {
              console.error(chalk.red(`Error al actualizar el fichero global de IDs: ${globalWriteErr.message}`));
            }
          });
        }
      });
    });
  });
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
    setTimeout(() => {
      addFunko(newFunko, argv.usuario);
    }, 100); // Espera 100ms antes de ejecutar addFunko
  }
};