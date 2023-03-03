import AccountModel from "../modules/account/account.schema";
import AccountService from "../modules/account/account.service";
import BadgeService from "../modules/badge/badge.service";
import UserModel from "../modules/user/user.schema";
import UserService from "../modules/user/user.service";
import Config from "./config";

class MockData {

    private badges = Config.CURRENCIES;

    private users = [
        {
            name: "admin",
            email: "admin@gmail.com",
            password: "password",
            accounts: [
                {
                    balance: 0,
                    badge: "USD"
                }
            ]
        },
        {
            name: "User 1",
            email: "user1@gmail.com",
            password: "password",
            accounts: [
                {
                    balance: 10000,
                    badge: "UYU"
                },
                {
                    balance: 22000,
                    badge: "ARS"
                },
                {
                    balance: 2500,
                    badge: "USD"
                }
            ]
        },
        {
            name: "User 2",
            email: "user2@gmail.com",
            password: "password",
            accounts: [
                {
                    balance: 20000,
                    badge: "UYU"
                },
                {
                    balance: 3000,
                    badge: "USD"
                }
            ]
        }
    ];

    public constructor() {}

    public async init() {
        for (const badge of this.badges) {
            const badgeExists = await new BadgeService().findeByName(badge);
            if (!badgeExists) {
                await new BadgeService().createBadge(badge);
            }
        }
        for (const user of this.users) {
            const userExists = await new UserService().getUserByEmail(user.email);
            if (userExists) {
                if (userExists.email === "user1@gmail.com") {
                    Config.setUserID(userExists._id.toString());
                }
                for (const account of user.accounts) {
                    const badge = await new BadgeService().findeByName(account.badge);
                    const accountExists = await new AccountService().findAccountByUserAndBadge(userExists._id.toString(), badge?._id.toString() ?? "");
                    if (!accountExists) {
                        const accountModel = new AccountModel({
                            balance: user.accounts[0].balance,
                            badge: badge?._id.toString(),
                            user: userExists._id.toString()
                        });
                        accountModel.save().then((newAccount) => {
                            if (userExists.email === "admin@gmail.com") {
                                Config.setAdminAccountID(newAccount._id.toString());
                                console.log('\x1b[32m%s\x1b[0m', "Admin USD account created -> ID: " + newAccount._id.toString());
                            }
                        });
                    } else {
                        if (userExists.email === "admin@gmail.com") {
                            Config.setAdminAccountID(accountExists._id.toString());
                            console.log('\x1b[32m%s\x1b[0m', "Admin USD account created -> ID: " + accountExists._id.toString());
                        }
                    }
                }
                continue;
            }
            const userModel = new UserModel({
                name: user.name,
                email: user.email,
                password: user.password
            });
            userModel.save().then(async (userSaved) => {
                if (userSaved.email === "user1@gmail.com") {
                    Config.setUserID(userSaved._id.toString());
                }
                for (const account of user.accounts) {
                    const badge = await new BadgeService().findeByName(account.badge);
                    const accountModel = new AccountModel({
                        balance: account.balance,
                        badge: badge?._id.toString(),
                        user: userSaved._id
                    });
                    accountModel.save().then((newAccount) => {
                        if (user.email === "admin@gmail.com") {
                            Config.setAdminAccountID(newAccount._id.toString());
                            console.log('\x1b[32m%s\x1b[0m', "Admin USD account created -> ID: " + newAccount._id.toString());
                        }
                    });
                }
            });
        }
    }

}

export default MockData;