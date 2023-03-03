import express, { Request, Response, NextFunction, Application } from "express";
import cors from "cors";
import { initDb } from "./db";
import Config from "./config";
import { router } from "../routes";
import ApiLayerService from "../libs/apilayer/apilayer.service";
import MockData from "./_mockData";
import HandleReqError from "./handleError";

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

                    setInterval(() => {
                        console.log('\x1b[33m%s\x1b[0m', "Getting exchange rates from ApiLayer...");
                        ApiLayerService.init(true).then(() => {
                            console.log('\x1b[32m%s\x1b[0m', "ApiLayerService updated");
                        }).catch((error: any) => {
                            console.log('\x1b[31m%s\x1b[0m', "Error to update ApiLayerService: ", error);
                            HandleReqError.systemError(error, "Error to update ApiLayerService");
                        });
                    }, 60 * Config.API_LAY * 1000)

                    this.app.listen(this.port, () => {
                        console.log('\x1b[32m%s\x1b[0m', "Server active!! -> PORT: " + this.port + "");
                    });

                }).catch((error: any) => {
                    console.log('\x1b[31m%s\x1b[0m', "Error to initialize ApiLayerService: ", error);
                    HandleReqError.systemError(error, "Error to initialize ApiLayerServic");
                });

            }).catch((error: any) => {
                console.log('\x1b[31m%s\x1b[0m', "Error to initialize mock data: ", error);
                HandleReqError.systemError(error, "Error to initialize mock data");
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
                HandleReqError.httpError(res, error, "Error to initialize mock data");
            }
        });
    }

    private routes() {
        this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
            console.error(err.stack);
            HandleReqError.httpError(res, err, "Error to initialize mock data");
        });
        this.app.use(Config.API_PREFIX, router);
    }

}

export default Server;