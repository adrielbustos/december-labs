import Config from "../../utils/config";
import HandleReqError from "../../utils/handleError";
import AccountService from "../account/account.service";
// import BadgeService from "../badge/badge.service";
import ITransaction from "./transaction.interface";
import TransactionModel from "./transaction.schema";

class TransactionService {

    public constructor() {}

    public async newTransaction(transaction: ITransaction) {
        const [
            origin, 
            destination
        ] = await this.validateTransaction(transaction);
        transaction.commission = 0;
        transaction.date = new Date();
        // transaction.date = new Date(transaction.date);
        if (transaction.origin === transaction.destination) {
            transaction.commission = this.createComision(transaction); // TODO comision puede ser una nueva transaccion????
            // transaction.amount = transaction.amount + transaction.commission; // TODO cuidado con esto
        }
        // TODO validar el BADGE
        // const badgeService = new BadgeService();
        // const badge = await badgeService.findBadgeByAmount(transaction.amount);
        // if (badge) {
        //     transaction.badge = badge._id;
        // }
        const acountService = new AccountService();
        // TODO SACAR PLATA DE ORIGEN
        await acountService.subtractBalance(transaction.origin, transaction.amount);
        // TODO PONER PLATA EN DESTINATION
        await acountService.addBalance(transaction.destination, transaction.amount);
        return await new TransactionModel(transaction).save();
    }

    private createComision(transaction: ITransaction) {
        const comision = transaction.amount * (Number(Config.COMISION)/100);
        const newTransaction:ITransaction = {
            origin: transaction.origin,
            description: "Comision",
            destination: Config.ADMIN_ACCOUNT_ID,
            amount: comision,
            // status: transaction.status,
            date: transaction.date,
            commission: 0
        }
        this.newTransaction(newTransaction).catch((error:any) => {
            HandleReqError.systemError(error, "Error to create comision transaction");
        });
        return comision;
    }

    private async validateTransaction(transaction: ITransaction) {
        const acountService = new AccountService();
        const [
            origin, 
            destination
        ] = await Promise.all([
            acountService.findAccountById(transaction.origin),
            acountService.findAccountById(transaction.destination),
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