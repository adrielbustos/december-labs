import { Schema, model } from "mongoose";
const accountSchema = new Schema({
    balance: {
        type: Number,
        required: true
    },
    badge: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'badge'
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    }
}, {
    timestamps: false
});
accountSchema.set('versionKey', false);
const AccountModel = model("account", accountSchema);
export default AccountModel;