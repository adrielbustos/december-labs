import LogModel from "../modules/log/log.schema";

class Logger {
    private static instance: Logger;
    private constructor() {}
    
    public static getInstance(): Logger {
        if (!Logger.instance) {
        Logger.instance = new Logger();
        }
        return Logger.instance;
    }
    
    public log(message: string, type:string, info:string = ""): void {
        new LogModel({
            date: new Date(),
            type,
            message,
            info
        }).save();
        console.log(message);
    }
}

export default Logger.getInstance();