import fs from 'fs';
import path from "path";
import chalk from "chalk";

export function watchMonitor(dirOberv:string, dirCopia: string) {
  const dirPath = path.join(process.cwd(), `/${dirOberv}`);
  //const dirPathCopia = path.join(process.cwd(), `/${dirCopia}`);
  fs.watch(dirPath, { recursive: true },(event,filename)=> {
    const filePath = path.join(process.cwd(), `/${dirOberv}/${filename}`);
    fs.lstat(filePath,(err,stats)=> {
      if(err) {
        console.log(chalk.red("error leyendo las stats"))
      } else {
        const filePathCP = path.join(process.cwd(), `/${dirCopia}/${filename}/${filename}_${stats.atime.toString()}`);
        //const DirPathCP = path.join(process.cwd(), `/${dirCopia}/${filename}`);
        copyFile(filePath,filePathCP)
      }
    })
  })
}

export function copyFile(filePath:string, filePathCP:string) {
  fs.cp(filePath,filePathCP,(err)=>{
    if(err) {
      console.log(chalk.red(`Se ha producido un error: ${err.message}`))
    } else {
      console.log(chalk.green(`Se ha creado`))
    }
  })
}

watchMonitor("modi", "modi_copia")
