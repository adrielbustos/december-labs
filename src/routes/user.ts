import { Router } from "express";
import UserController from "../modules/user/user.controller";
import UserService from "../modules/user/user.service";
import Middlewares from "../utils/middlewares";
const router = Router();

const service = new UserService();
const uController = new UserController(service);

router.get("/accounts", [
    Middlewares.checkToken
], uController.getAccounts);

export { router };