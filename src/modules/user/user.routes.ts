import { Router, Request, Response, NextFunction } from "express";
import controller from "./user.controller";
const router = Router();

router.post("/", controller.newUser);

export default router;