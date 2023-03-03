// import fs from 'fs';
// import { Router, Request, Response } from "express";
// const router = Router();

// const pathRouter = `${__dirname}`;

// const removeExtension = (fileName:string):string => {
//     return fileName.split('.').shift() ?? "";
// }

// fs.readdirSync(pathRouter).filter((file:string) => {
//     const fileWithOutExt = removeExtension(file);
//     const skip = ['index'].includes(fileWithOutExt);
//     if (!skip) {
//         console.log("'\x1b[32m%s\x1b[0m'", 'CARGAR RUTA ---->', fileWithOutExt);
//         import(`./${fileWithOutExt}`).then(module => {
//             router.use(`/${fileWithOutExt}`, module.default);
//         }).catch(error => {
//             console.error(`Error al importar el archivo de ruta ${fileWithOutExt}: `, error);
//         });
//     }
// })

// router.get('*', (req:Request, res:Response) => {
//     res.status(404);
//     // console.log(req);
//     res.send({ error: 'Not found 2' })
// })

// export default router;

import { Router } from "express";
import { readdirSync } from "fs";

const PATH_ROUTER = `${__dirname}`;
const router = Router();

/**
 *
 * @returns
 */
const cleanFileName = (fileName: string) => {
  const file = fileName.split(".").shift();
  return file;
};

readdirSync(PATH_ROUTER).filter((fileName) => {
  const cleanName = cleanFileName(fileName);
  if (cleanName !== "index") {
    import(`./${cleanName}`).then((moduleRouter) => {
      router.use(`/${cleanName}`, moduleRouter.router);
    });
  }
});

export { router };