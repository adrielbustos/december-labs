import { Schema, model } from "mongoose";
const conversionSchema = new Schema({
    fromCurrency: {
        type: String,
        required: true
      },
      toCurrency: {
        type: String,
        required: true
      },
      rate: {
        type: Number,
        required: true
      }
}, {
    timestamps: true
});
conversionSchema.set('versionKey', false);
export default model("conversion", conversionSchema);