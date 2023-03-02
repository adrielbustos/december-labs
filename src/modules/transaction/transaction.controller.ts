import { Request, Response } from "express";
import HandleReqError from "../../utils/handleError";
import AccountService from "../account/account.service";
import { IPostTransaction, IGetTransactions } from "./transaction.interface";
import TransactionService from "./transaction.service";

class TransactionController {

    private service: TransactionService;

    public constructor(service: TransactionService) {
        this.service = service;
    }

    public newTransaction = async (req: Request, res: Response) => {
        try {
            const body = req.body as IPostTransaction;
            const user_id = req.cookies.user_id as string;
            const allUserAccounts = await new AccountService().findAccountsByUser(user_id);
            if (body.accountFrom && !allUserAccounts.find((account) => account._id.toString() === body.accountFrom)) {
                return res.status(401).json({message: "accountFrom do not exist or you do not have permission to use it"});
            }
            const transaction = await this.service.newTransaction(body);
            return res.status(201).json(transaction);
        } catch (error:any) {
            HandleReqError.httpError(res, error, "Error to create new transaction");
        }
    }

    public getTransactions = async (req: Request, res: Response) => {
        const query = req.query as IGetTransactions;
        const user_id = req.cookies.user_id as string;
        const allUserAccounts = await new AccountService().findAccountsByUser(user_id);
        if (query.sourceAccountID && !allUserAccounts.find((account) => account._id.toString() === query.sourceAccountID)) {
            return res.status(401).json({message: "Only you can see your transactions"});
        }
        if (query.from && query.to && (query.from < query.to)) {
            return res.status(400).json({message: "from date must be greater than to date"});
        }
        try {
            const transactions = await this.service.getTransactions(query);
            return res.status(200).json(transactions);
        } catch (error:any) {
            HandleReqError.httpError(res, error, "Error to get transactions");
        }
    }
    
}

export default TransactionController;