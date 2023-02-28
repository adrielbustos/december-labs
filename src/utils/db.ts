import mongoose from "mongoose";
import Config from "./config";

export const initDb = () => {
    try {
        return mongoose.connect(Config.MONGO_LOCAL_CONNECTION, {
            // useNewUrlParser: true,
        });
    } catch (error) {
        console.error(error);
        throw new Error("Error to inicialize database");
    }
}