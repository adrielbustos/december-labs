import { Router } from "express";
import { check } from "express-validator";
import controller from "../modules/auth/auth.controller";
import Middlewares from "../utils/middlewares";
const router = Router();

router.post("/login", [
    check("email", "email is required").isEmail(),
    check("password", "password is required").isString(),
    Middlewares.checkErrors
], controller.login);

router.post("/register", [
    check("email", "email is required").isEmail(),
    check("password", "password is required").isString(),
    Middlewares.checkErrors
], controller.register);

export default router;