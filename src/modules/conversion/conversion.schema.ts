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
  timestamps: false
});
conversionSchema.set('versionKey', false);
const ConversionModel = model("conversion", conversionSchema);
export default ConversionModel;

const conversionSchema2 = new Schema({
  usd: {
    type: Number,
    required: true
  },
  eur: {
    type: Number,
    required: true
  },
  gbp: {
    type: Number,
    required: true
  },
  mxn: {
    type: Number,
    required: true
  },
  uru: {
    type: Number,
    required: true
  },
}, {
  timestamps: true
});