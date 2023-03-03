import AccountService from "../account/account.service";
import IUser from "./user.interface";
import UserModel from "./user.schema";

export default class UserService {
    constructor() {}
    public newUser = async (user:IUser) => {
        const model = new UserModel(user);
        return await model.save();
    }
    public getUserByEmail = async (email:string) => {
        return await UserModel.findOne({ email });
    }
    public getAccountsByUserID = async (userID:string) => {
        return await new AccountService().findAccountsByUser(userID);
    }
}