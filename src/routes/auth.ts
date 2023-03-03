import { Router } from "express";
import { check } from "express-validator";
import AuthController from "../modules/auth/auth.controller";
import AuthService from "../modules/auth/auth.service";
import Middlewares from "../utils/middlewares";
const router = Router();

const authService = new AuthService();
const controller = new AuthController(authService);

router.post("/login", [
    check("email", "email is required").isEmail(),
    check("password", "password is required").isString(),
    Middlewares.checkErrors
], controller.login);

// router.post("/register", [
//     check("email", "email is required").isEmail(),
//     check("password", "password is required").isString(),
//     Middlewares.checkErrors
// ], controller.register);

export { router };