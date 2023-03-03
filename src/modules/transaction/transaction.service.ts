import Config from "../../utils/config";
import HandleReqError from "../../utils/handleError";

import ApiLayerService from "../../libs/apilayer/apilayer.service";
import AccountService from "../account/account.service";
import BadgeService from "../badge/badge.service";

import { IGetTransactions, IPostTransaction } from "./transaction.interface";
import TransactionModel from "./transaction.schema";

class TransactionService {

    public constructor() { }

    public async newTransaction(transaction: IPostTransaction) {
        const [
            origin,
            destination
        ] = await this.validateTransaction(transaction);
        transaction.commission = 0;
        transaction.date = transaction.date ?? new Date();
        if (origin.user._id.toString() !== destination.user._id.toString() && destination._id.toString() !== Config.ADMIN_ACCOUNT_ID) {
            transaction.commission = this.createComision(transaction);
        }
        let destinationAmunt = transaction.amount;
        if (origin.badge._id.toString() !== destination.badge._id.toString()) {
            const badgeService = new BadgeService();
            const [originBadge, destinationBadge] = await Promise.all([
                badgeService.findBadgeById(origin.badge._id.toString()),
                badgeService.findBadgeById(destination.badge._id.toString())
            ]);
            if (!originBadge || !destinationBadge) {
                throw new Error("Error to get badges");
            }
            destinationAmunt = ApiLayerService.convertCurrency(transaction.amount, originBadge.name, destinationBadge.name);
        }
        const acountService = new AccountService();
        await Promise.all([
            acountService.subtractBalance(transaction.accountFrom, transaction.amount),
            acountService.addBalance(transaction.accountTo, destinationAmunt),
        ]);
        return await new TransactionModel(transaction).save();
    }

    public async getTransactions(query: IGetTransactions) {
        const filter: any = {};
        if (query.from) {
            filter.date = { $gte: query.from };
        }
        if (query.to) {
            if (filter.date) {
                filter.date.$lte = query.to;
            } else {
                filter.date = { $lte: query.to };
            }
        }
        if (query.sourceAccountID) {
            filter.accountFrom = query.sourceAccountID;
        }
        const userTransactions = await TransactionModel.find(filter).populate({
            path: "accountFrom",
            populate: {
                path: 'user'
            }
        }).populate({
            path: "accountTo",
            populate: {
                path: 'user'
            }
        });
        return userTransactions.map((transaction:any) => {
            return {
                _id: transaction._id,
                date: transaction.date,
                amount: transaction.amount,
                description: transaction.description,
                commission: transaction.commission,
                accountFrom: {
                    id: transaction.accountFrom._id,
                    name: transaction.accountFrom.user.name,
                },
                accountTo: {
                    id: transaction.accountTo._id,
                    name: transaction.accountTo.user.name,
                }
            }
        });
    }

    private createComision(transaction: IPostTransaction) {
        const comision = transaction.amount * (Config.COMISION / 100);
        const newTransaction: IPostTransaction = {
            accountFrom: transaction.accountFrom,
            accountTo: Config.ADMIN_ACCOUNT_ID,
            description: "Comision",
            amount: comision,
            date: transaction.date,
            commission: 0
        }
        this.newTransaction(newTransaction).catch((error: any) => {
            HandleReqError.systemError(error, "Error to create comision transaction");
        });
        return comision;
    }

    private async validateTransaction(transaction: IPostTransaction) {
        const acountService = new AccountService();
        const [
            origin,
            destination
        ] = await Promise.all([
            acountService.findAccountById(transaction.accountFrom),
            acountService.findAccountById(transaction.accountTo),
        ]);
        if (!destination) {
            throw new Error("Destination account not exists: " + transaction.accountTo);
        }
        if (!origin) {
            throw new Error("Origin account not exists");
        }
        if (transaction.amount <= 0) {
            throw new Error("Amount must be greater than 0");
        }
        if (origin.balance < transaction.amount) {
            throw new Error("Origin account has not enough balance");
        }
        return [origin, destination];
    }

}

export default TransactionService;