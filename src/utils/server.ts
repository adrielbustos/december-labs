import express, { Request, Response, NextFunction, Application } from "express";
import cors from "cors";
import { initDb } from "./db";
import Config from "./config";
import indexRoutes from '../routes';

class Server {

    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = Config.PORT;
        this.connectDb();
        this.middlewares();
        this.routes();
    }

    private async connectDb() {
        console.log("trying to connect to mongo...");
        initDb().then((mongo) => {
            console.log("connected to mongo!!!");
        });
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log("server active on port: " + this.port + "");
        });
    }

    private middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            console.log(`\n [Request] \n`);
            try {
                next();
            } catch (error: any) {
                res.status(500).json({ status: false, msg: JSON.stringify(error) });
            }
        });
    }

    private routes() {
        this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
            console.error(err.stack);
            res.status(500).send('Something went wrong!');
        });
        this.app.use(Config.API_PREFIX, indexRoutes);
    }

}

export default Server;