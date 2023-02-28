import { Schema, model } from "mongoose";
const transactionStatusSchema = new Schema({
    status: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});
transactionStatusSchema.set('versionKey', false);
const TransactionStatusModel = model("transactionStatus", transactionStatusSchema);
export default TransactionStatusModel;