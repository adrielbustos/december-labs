import express, { Request, Response, NextFunction, Application } from "express";
import cors from "cors";
import { initDb } from "./db";
import Config from "./config";
import indexRoutes from '../routes';
import ApiLayerService from "../libs/apilayer/apilayer.service";
import MockData from "./_mockData";

class Server {

    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = Config.PORT;
        this.middlewares();
        this.routes();
    }

    public async init() {
        console.log('\x1b[33m%s\x1b[0m', "trying to connect to mongo...");
        initDb().then((mongo) => {
            mongo.set('strictQuery', false);

            console.log('\x1b[32m%s\x1b[0m', "connected to mongo");
            console.log('\x1b[33m%s\x1b[0m', "mocking data on DB...");

            const mock = new MockData();
            mock.init().then(() => {

                console.log('\x1b[32m%s\x1b[0m', "Mock data initialized");
                console.log('\x1b[33m%s\x1b[0m', "Getting exchange rates from ApiLayer...");

                ApiLayerService.init().then(() => {

                    console.log('\x1b[32m%s\x1b[0m', "ApiLayerService initialized");
                    // TODO set timeout to 1 hour for update exchange rates
                    this.app.listen(this.port, () => {
                        console.log('\x1b[32m%s\x1b[0m', "Server active!! -> PORT: " + this.port + "");
                    });

                }).catch((error: any) => {
                    console.log('\x1b[31m%s\x1b[0m', "Error to initialize ApiLayerService: ", error);
                });

            }).catch((error: any) => {
                console.log('\x1b[31m%s\x1b[0m', "Error to initialize mock data: ", error);
            });
        });
    }

    private middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use((req: Request, res: Response, next: NextFunction) => {
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