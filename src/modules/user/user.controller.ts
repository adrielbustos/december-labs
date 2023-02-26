import { Request, Response } from "express";
import HandleReqError from "../../utils/handleError";
import UserService from "./user.service";

class UserController {
    private service: UserService;
    constructor(service: UserService) {
        this.service = service;
    }
    public newUser = async (req: Request, res: Response) => {
        try {
            await this.service.newUser();
            res.status(200).json({
                ok: true,
                message: "New user created"
            });
        } catch (error:any) {
            HandleReqError.httpError(res, error, "Error to create new user");
        }
    }
}

export default new UserController(new UserService());