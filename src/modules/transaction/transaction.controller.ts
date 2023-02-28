import { Request, Response } from "express";
import HandleReqError from "../../utils/handleError";
import ITransaction from "./transaction.interface";
import TransactionService from "./transaction.service";

class TransactionController {

    private service: TransactionService;

    public constructor(service: TransactionService) {
        this.service = service;
    }

    public newTransaction = async (req: Request, res: Response) => {
        try {
            const body:ITransaction = req.body;
            body.origin = req.cookies.user._id as string;
            const transaction = await this.service.newTransaction(body);
            return res.status(201).json(transaction);
        } catch (error:any) {
            HandleReqError.httpError(res, error, "Error to create new transaction");
        }
    }
    
}

export default TransactionController;