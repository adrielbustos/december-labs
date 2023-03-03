import dotenv from "dotenv";
dotenv.config();

class Config {
    public ADMIN_ACCOUNT_ID = "";
    public USER_LOGGED_ID = "";
    public API_PREFIX = '/api/v1';
    public PORT = process.env.PORT || "3000";
    public MONGO_LOCAL_CONNECTION = process.env.MONGO_LOCAL_CONNECTION || "";
    public COMISION = Number(process.env.COMISION) || 0;
    public API_LAYER_ACCESS_KEY = process.env.API_LAYER_ACCESS_KEY || "";
    public API_LAYER_URL = process.env.API_LAYER_URL || "";
    public CURRENCIES = ["USD", "EUR", "ARS", "BRL", "CLP", "COP", "MXN", "PEN", "UYU"];
    public API_LAY = Number(process.env.API_LAY) ?? 3600;
    private static instance: Config;
    private constructor() {}
    public static getInstance(): Config {
        if (!Config.instance) {
            Config.instance = new Config();
        }
        return Config.instance;
    }
    public setAdminAccountID(id: string) {
        this.ADMIN_ACCOUNT_ID = id;
    }
    public setUserID(id: string) {
        this.USER_LOGGED_ID = id;
    }
}

export default Config.getInstance();