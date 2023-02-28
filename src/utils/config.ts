export default class Config {
    public static API_PREFIX = '/api/v1';
    public static PORT = process.env.PORT || "3000";
    public static MONGO_LOCAL_CONNECTION = process.env.MONGO_LOCAL_CONNECTION || "";
    public static ADMIN_ACCOUNT_ID = process.env.ADMIN_ACCOUNT_ID || "";
    public static COMISION = process.env.COMISION || "";
}