import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export default class Middlewares {
    public static checkErrors(req:Request, res:Response, next:NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        return next();
    }
    public static async checkToken(req:Request, res:Response, next:NextFunction) {
        // const token = req.headers["x-access-token"];
        // if (!token) {
        //     return res.status(403).json({ message: "No token provided!" });
        // }
        try {
            // const decoded = jwt.verify(token, Config.SECRET);
            // req.cookies.userId = decoded.id;
            req.cookies = {};
            req.cookies.user_id = "63ffecd811ffc2e2160581ca";
            return next();
        } catch (error) {
            console.log(error);
            return res.status(401).json({ message: "Unauthorized!" });
        }
    }
}