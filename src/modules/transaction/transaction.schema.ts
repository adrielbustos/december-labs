import { Schema, model } from "mongoose";
const transactionSchema = new Schema({
    accountFrom: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'account'
    },
    accountTo: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'account'
    },
    amount: {
        type: Number,
        required: true
    },
    commission: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: false
    }
}, {
    timestamps: false
});
transactionSchema.set('versionKey', false);
const TransactionModel = model("transaction", transactionSchema);
export default TransactionModel;