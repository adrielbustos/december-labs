import { Router } from "express";
import { check } from "express-validator";
import controller from "../modules/user/user.controller";
import Middlewares from "../utils/middlewares";
const router = Router();

router.post("/", [
    check("email", "email is required").isEmail(),
    check("password", "password is required").isString(),
    Middlewares.checkErrors
], controller.newUser);

export default router;