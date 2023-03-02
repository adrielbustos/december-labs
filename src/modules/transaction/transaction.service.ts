import Config from "../../utils/config";
import HandleReqError from "../../utils/handleError";

import ApiLayerService from "../../libs/apilayer/apilayer.service";
import AccountService from "../account/account.service";

import { IGetTransactions, IPostTransaction } from "./transaction.interface";
import TransactionModel from "./transaction.schema";
import BadgeService from "../badge/badge.service";

class TransactionService {

    public constructor() {}

    public async newTransaction(transaction: IPostTransaction) {
        const [
            origin, 
            destination
        ] = await this.validateTransaction(transaction);
        transaction.commission = 0;
        transaction.date = new Date();
        // transaction.date = new Date(transaction.date);
        if (transaction.accountFrom === transaction.accountTo) {
            transaction.commission = this.createComision(transaction);
        }
        let destinationAmunt = transaction.amount;
        if (origin.badge !== destination.badge) {
            // const comision = this.createComision(transaction); // TODO se puede hacer una comision cuando se hace una conversion de moneda?
            const badgeService = new BadgeService();
            const [originBadge, destinationBadge] = await Promise.all([
                badgeService.findBadgeById(origin.badge._id.toString()),
                badgeService.findBadgeById(destination.badge._id.toString())
            ]);
            if (!originBadge || !destinationBadge) {
                throw new Error("Error to get badges");
            }
            // if (originBadge?.name !== destinationBadge?.name) {
            //     transaction.commission = this.createComision(transaction);
            // }
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
        const filter:any = {};
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
            filter.origin = query.sourceAccountID;
        }
        return await TransactionModel.find(filter).populate("origin").populate("destination").populate("badge");
    }

    private createComision(transaction: IPostTransaction) {
        const comision = transaction.amount * (Number(Config.COMISION)/100);
        const newTransaction:IPostTransaction = {
            accountFrom: transaction.accountFrom,
            description: "Comision",
            accountTo: Config.ADMIN_ACCOUNT_ID,
            amount: comision,
            date: transaction.date,
            commission: 0
        }
        this.newTransaction(newTransaction).catch((error:any) => {
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
            throw new Error("Destination account not exists");
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