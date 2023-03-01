import { Schema, model } from "mongoose";
const transactionSchema = new Schema({
    origin: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'account'
    },
    destination: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'account'
    },
    amount: {
        type: Number,
        required: true
    },
    conversion: { // para saber a cuanto se convirtio ese momento
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'conversion'
    },
    // status: {
    //     type: Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'transactionStatus'
    // },
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