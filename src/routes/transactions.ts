import { Router } from "express";
import { query } from "express-validator";
import TransactionController from "../modules/transaction/transaction.controller";
import TransactionService from "../modules/transaction/transaction.service";
import Middlewares from "../utils/middlewares";
const router = Router();

const service = new TransactionService();
const controller = new TransactionController(service);

router.get("/", [
    Middlewares.checkToken,
    query("from", "from is required").isISO8601().toDate().optional({nullable: true}),
    query("to", "to is required").isISO8601().toDate().optional({nullable: true}),
    query("sourceAccountID", " SourceAccountID is required").isString().optional({nullable: true}),
    Middlewares.checkErrors
], controller.getTransactions);

export { router };