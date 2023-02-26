import fs from 'fs';
import { Router, Request, Response } from "express";
const router = Router();

const pathRouter = `${__dirname}`;

const removeExtension = (fileName:string):string => {
    return fileName.split('.').shift() ?? "";
}

fs.readdirSync(pathRouter).filter((file:string) => {
    const fileWithOutExt = removeExtension(file);
    const skip = ['index'].includes(fileWithOutExt);
    if (!skip) {
        console.log('CARGAR RUTA ---->', fileWithOutExt);
        import(`./${fileWithOutExt}`).then(module => {
            router.use(`/${fileWithOutExt}`, module.default);
        }).catch(error => {
            console.error(`Error al importar el archivo de ruta ${fileWithOutExt}: `, error);
        });
    }
})

router.get('*', (req:Request, res:Response) => {
    res.status(404)
    res.send({ error: 'Not found' })
})

export default router;