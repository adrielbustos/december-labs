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
    conversion: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'conversion'
    },
    status: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'transactionStatus'
    },
    commission: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});
transactionSchema.set('versionKey', false);
export default model("transaction", transactionSchema);