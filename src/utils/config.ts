export default class Config {
    public static API_PREFIX = '/api/v1';
    public static PORT = process.env.PORT || "3000";
    public static MONGO_LOCAL_CONNECTION = process.env.MONGO_LOCAL_CONNECTION || "";
    public static ADMIN_ACCOUNT_ID = process.env.ADMIN_ACCOUNT_ID || "";
    public static COMISION = process.env.COMISION || "";
    public static API_LAYER_ACCESS_KEY = process.env.API_LAYER_ACCESS_KEY || "";
    public static API_LAYER_URL = process.env.API_LAYER_URL || "";
    public static CURRENCIES = ["USD", "EUR", "ARS", "BRL", "CLP", "COP", "MXN", "PEN", "UYU"];
    public static CURRENCIES_SYMBOLS = ["$", "€", "$", "R$", "$", "$", "$", "S/", "$"];
    public static API_LAY = process.env.API_LAY ?? "3600";
}