import AccountModel from "./account.schema";

class AccountService {
    constructor() {}
    public async findAccountById(id: string) {
        return await AccountModel.findById(id).populate("user");
    }
    public async findAccountsByUser(userId: string) {
        return await AccountModel.find({ user: userId }).populate("badge");
    }
    public async findAccountByUserAndBadge(userId: string, badgeId: string) {
        return await AccountModel.findOne({ user: userId, badge: badgeId });
    }
    public async subtractBalance(id: string, amount: number) {
        return await AccountModel.findByIdAndUpdate(id, { $inc: { balance: -amount } });
    }
    public async addBalance(id: string, amount: number) {
        return await AccountModel.findByIdAndUpdate(id, { $inc: { balance: amount } });
    }
}

export default AccountService;