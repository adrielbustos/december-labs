import axios from "axios";
import ConversionModel from "../../modules/conversion/conversion.schema";
import Config from "../../utils/config";

class ApiLayerService {

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

    public async init(forced = false) {
        // const lasUpdated = await ConversionModel.find();
        // console.log("lasUpdated.length > 0 ", lasUpdated.length > 0);
        // let lastUpdated = null;
        // if (lasUpdated.length > 0) {
        //     lastUpdated = lasUpdated[0];
        //     const now = new Date();
        //     const diff = Math.abs(now.getTime() - lastUpdated.date.getTime());
        //     const diffMinutes = Math.floor((diff / 1000) / 60);
        //     if (diffMinutes < Number(Config.API_LAY)) {
        //         console.log("Exchange rates are updated");
        //         this.alreadyInit = true;
        //         console.log("All exchange rates: ", this.conversions);
        //         return;
        //     }
        // }
        const response = await axios.get(`${this.url}/latest?symbols=${this.currencies.join(",")}&base=${this.base_currency}`, {
            headers: this.headers
        });
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
        console.log("All exchange rates: ", this.conversions);
        // if (lastUpdated != null) {
        //     lastUpdated.update({
        //         date: new Date(),
        //     });
        // } else {
        //     new ConversionModel({
        //         date: new Date(),
        //     }).save();
        // }
        this.alreadyInit = true;
    }
}

export default ApiLayerService.getInstance();

interface ILastRates {
    base: string;
    date: Date;
    rates: object;
    success: boolean;
    timestamp: number;
}