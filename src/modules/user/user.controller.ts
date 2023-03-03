import { Request, Response } from "express";
import HandleReqError from "../../utils/handleError";
import UserService from "./user.service";

class UserController {
    private service: UserService;
    constructor(service: UserService) {
        this.service = service;
    }
    public getAccounts = async (req: Request, res: Response) => {
        try {
            const user = await this.service.getAccountsByUserID(req.cookies.user_id);
            return res.status(201).json(user);
        } catch (error:any) {
            HandleReqError.httpError(res, error, "Error to create new user");
        }
    }
}

export default UserController;