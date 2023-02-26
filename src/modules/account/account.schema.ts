import { Schema, model } from "mongoose";
const accountSchema = new Schema({
    amount: {
        type: Number,
        required: true
    },
    badge: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'badge'
    }
}, {
    timestamps: true
});
accountSchema.set('versionKey', false);
export default model("account", accountSchema);