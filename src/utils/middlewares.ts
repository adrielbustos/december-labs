import { validationResult } from "express-validator";

export default class Middlewares {
    public static checkErrors(req:any, res:any, next:any) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        return next();
    }
}