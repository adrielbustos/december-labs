import { validationResult } from "express-validator";

export default class Middlewares {
    public static checkErrors(req:any, res:any, next:any) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        return next();
    }
    public static async checkToken(req:any, res:any, next:any) {
        const token = req.headers["x-access-token"];
        if (!token) {
            return res.status(403).json({ message: "No token provided!" });
        }
        try {
            // const decoded = jwt.verify(token, Config.SECRET);
            // req.userId = decoded.id;
            return next();
        } catch (error) {
            return res.status(401).json({ message: "Unauthorized!" });
        }
    }
}