import { Response } from "express";

export default class HandleReqError {
    private constructor() {}
    public static httpError = (res:Response, err:Error, message:string = "") => {
        res.status(500).json({
            ok: false,
            error: err.message,
            message
        });
    }
}