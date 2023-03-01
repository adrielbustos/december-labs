import { Request, Response } from "express";
import AuthService from "./auth.service";

class AuthController {
    
    service:AuthService;

    public constructor(service:AuthService) {
        this.service = service;
    }
    
    public login = async (req: Request, res: Response) => {
    
        
    }

    public register = async (req: Request, res: Response) => {

    }

}

export default AuthController;