import mongoose from "mongoose";

export const initDb = () => {
    try {
        return mongoose.connect(process.env.MONGO_LOCAL_CONNECTION || "", {
            // useNewUrlParser: true,
        });
    } catch (error) {
        console.error(error);
        throw new Error("Error to inicialize database");
    }
}