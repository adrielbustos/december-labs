import dotenv from "dotenv";
dotenv.config();
import Server from "./utils/server";

const server = new Server();
server.init();