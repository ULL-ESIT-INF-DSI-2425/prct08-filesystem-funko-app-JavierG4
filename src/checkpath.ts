import fs from 'fs';
import path from "path";
import chalk from "chalk";

export function checkpath(user:string) {
  const dirPath = path.join(process.cwd(), `/db/${user}`);
  const filePath = path.join(process.cwd(), `/db/${user}/${user}.json`);

  fs.access(dirPath, (error) => {
    if(error) {
      const log = console.log
      log(chalk.green((`Creando el directorio del usuario ${user}`)))
      fs.mkdir(dirPath, { recursive: true }, (err) => {
        if (err) {
          console.error(chalk.red(`Error al crear el directorio: ${err.message}`));
        } else {
          console.log(chalk.green(`Directorio creado correctamente: ${dirPath}`));
        }
      });
    }
  })

  fs.access(filePath, (error) => {
    if(error) {
      const log = console.log
      log(chalk.green((`Creando el fichero del usuario ${user}`)))
      fs.writeFile(filePath, '[]', 'utf8', (err) => {
        if (err) {
          console.error(chalk.red(`Error al crear el fichero: ${err.message}`));
        } else {
          console.log(chalk.green(`Fichero creado correctamente: ${dirPath}`));
        }
      })
    }
  })
}
