import TransactionStatusModel from "./transactionStatus.shcema";

class TransactionStatusService {
    public constructor() {}
    public async getByStatus(status:string) {
        return await TransactionStatusModel.findOne({status});
    }
}

export default TransactionStatusService;