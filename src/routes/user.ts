import { Router } from "express";
import { body } from "express-validator";
import UserController from "../modules/user/user.controller";
import UserService from "../modules/user/user.service";
import Middlewares from "../utils/middlewares";
const router = Router();

const service = new UserService();
const uController = new UserController(service);

router.post("/", [
    body("email", "email is required").isEmail(),
    body("password", "password is required").isString(),
    body("name", "name is required").isString(),
    Middlewares.checkErrors
], uController.newUser);

export default router;