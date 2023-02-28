import IUser from "./user.interface";
import UserModel from "./user.schema";

export default class UserService {
    constructor() {}
    public newUser = async (user:IUser) => {
        // TODO validate user
        user.accounts = [];
        const model = new UserModel(user);
        return await model.save();
    }
}