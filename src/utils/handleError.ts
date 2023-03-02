import { Response } from "express";
import logger from "./logger";

export default class HandleReqError {
    private constructor() {}
    public static httpError = (res:Response, err:Error, message:string = "") => {
        logger.log(err.message, "httpError", message);
        res.status(500).json({
            ok: false,
            error: err.message,
            message
        });
    }
    public static systemError = (err:Error, message:string = "") => {
        logger.log(err.message, "systemError", message);
    }
}