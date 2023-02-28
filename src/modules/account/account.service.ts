import AccountModel from "./account.schema";

class AccountService {
    constructor() {}
    public async findAccountById(id: string) {
        return await AccountModel.findById(id);
    }
    public async subtractBalance(id: string, amount: number) {
        return await AccountModel.findByIdAndUpdate(id, { $inc: { balance: -amount } });
    }
    public async addBalance(id: string, amount: number) {
        return await AccountModel.findByIdAndUpdate(id, { $inc: { balance: amount } });
    }
}

export default AccountService;