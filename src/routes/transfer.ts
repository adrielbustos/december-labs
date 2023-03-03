import { Router } from "express";
import { body } from "express-validator";
import TransactionController from "../modules/transaction/transaction.controller";
import TransactionService from "../modules/transaction/transaction.service";
import Middlewares from "../utils/middlewares";
const router = Router();

const service = new TransactionService();
const controller = new TransactionController(service);

router.post("/", [
    Middlewares.checkToken,
    body("accountFrom", "accountFrom is required").isMongoId(),
    body("accountTo", "accountTo is required").isMongoId(),
    body("amount", "amount is required").isFloat({ min: 0}),
    body("description", "description is required").isString().optional({nullable: true}),
    // body("date", "date is required").isISO8601().toDate(), // TODO is necesary?
    Middlewares.checkErrors
], controller.newTransaction);

export { router };