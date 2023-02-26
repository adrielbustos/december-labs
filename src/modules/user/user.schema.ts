import { Schema, model } from "mongoose";
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    accounts: [
        {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'account'
        }
    ]
}, {
    timestamps: true
});
userSchema.set('versionKey', false);
export default model("user", userSchema);