import { Router } from "express";
import { body } from "express-validator";
import TransactionController from "../modules/transaction/transaction.controller";
import TransactionService from "../modules/transaction/transaction.service";
import Middlewares from "../utils/middlewares";
const router = Router();

const service = new TransactionService();
const controller = new TransactionController(service);

router.post("/", [
    body("destination", "destination is required").isMongoId(),
    body("description", "description is required").isString().optional({nullable: true}),
    body("amount", "amount is required").isFloat({ min: 0}),
    body("date", "date is required").isDate(), // TODO is necesary?
    Middlewares.checkErrors
], controller.newTransaction);

export default router;