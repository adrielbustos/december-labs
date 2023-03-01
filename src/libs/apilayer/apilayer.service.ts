import axios from "axios";
import Config from "../../utils/config";

export default class ApiLayerService {

    private url = Config.API_LAYER_URL;
    private base_currency = "USD";
    private currencies = Config.CURRENCIES;
    private headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "apikey": Config.API_LAYER_ACCESS_KEY
    }
    private conversions: Array<{
        badge: string;
        value: number;
    }> = [];
    private alreadyInit = false;
    private static instance: ApiLayerService;

    private constructor() {
        for (const currency of this.currencies) {
            this.conversions.push({
                badge: currency,
                value: 0
            });
        }
    }

    public convertCurrency(amount: number, from: string, to: string) {
        if (!this.alreadyInit) {
            throw new Error("Error to find exchange rates");
        }
        const fromIndex = this.conversions.findIndex((item) => item.badge === from);
        const toIndex = this.conversions.findIndex((item) => item.badge === to);
        if (fromIndex === -1 || toIndex === -1) {
            throw new Error("Error to find exchange rates");
        }
        return (amount * this.conversions[toIndex].value) / this.conversions[fromIndex].value;
    }

    public static getInstance(): ApiLayerService {
        if (!ApiLayerService.instance) {
            ApiLayerService.instance = new ApiLayerService();
        }
        return ApiLayerService.instance;
    }

    public async getExchangeRate(from: string, to: string) {
        if (!this.alreadyInit) {
            await this.init();
        }
        const fromIndex = this.conversions.findIndex((item) => item.badge === from);
        const toIndex = this.conversions.findIndex((item) => item.badge === to);
        if (fromIndex === -1 || toIndex === -1) {
            throw new Error("Error to find exchange rates");
        }
        return this.conversions[toIndex].value / this.conversions[fromIndex].value;
    }

    public async init() {
        return;
        if (this.alreadyInit) {
            return;
        }
        const response = await axios.get(this.url + `/latest?symbols=${this.currencies.join(",")}&base=${this.base_currency}`, {
            headers: this.headers
        });
        console.log("response.data ", response.data);
        const data: ILastRates = response.data;
        if (!data.success || !data.rates) {
            throw new Error("Error to get exchange rates");
        }
        for (const [corrency, value] of Object.entries(data.rates)) {
            console.log(`${corrency}: ${value}`);
            const index = this.conversions.findIndex((item) => item.badge === corrency);
            if (index !== -1) {
                this.conversions[index].value = value;
            }
        }
        this.alreadyInit = true;
    }
}

interface ILastRates {
    base: string;
    date: Date;
    rates: object;
    success: boolean;
    timestamp: number;
}