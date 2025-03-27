import fs from 'fs';
import path from "path";
import chalk from "chalk";

export function logFiles(camino:string) {
  fs.readdir(camino,(err, data)=> {
    if(err) {
      console.log(chalk.red("No se ha podido leer el directorio"))
    } else {
      console.log(chalk.green(data))
    }
  })
}

const dirCopia = process.argv
const filename = process.argv[2]
const DirPathCP = path.join(process.cwd(), `/${dirCopia}/${filename}`);
logFiles(DirPathCP)