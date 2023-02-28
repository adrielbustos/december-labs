import { Request, Response } from "express";
import HandleReqError from "../../utils/handleError";
import IUser from "./user.interface";
import UserService from "./user.service";

class UserController {
    private service: UserService;
    constructor(service: UserService) {
        this.service = service;
    }
    public newUser = async (req: Request, res: Response) => {
        try {
            const body:IUser = req.body;
            const user = await this.service.newUser(body);
            return res.status(201).json(user);
        } catch (error:any) {
            HandleReqError.httpError(res, error, "Error to create new user");
        }
    }
}

export default UserController;