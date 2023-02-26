import express, { Application } from "express";
import cors from "cors";
import { initDb } from "./db";
import userRoutes from "../modules/user/user.routes";
import Config from "./config";

class Server {

    private app:Application;
    private port:string;
    private paths = {
        user: Config.API_PREFIX + "/user"
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || "8000";
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

    public listen():void {
        this.app.listen(this.port, () => {
            console.log("server active on port: " + this.port + "");
        });
    }

    private middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    private routes() {
        this.app.use(this.paths.user, userRoutes);
    }

}

export default Server;