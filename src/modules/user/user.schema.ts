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
    }
}, {
    timestamps: false
});
userSchema.set('versionKey', false);
const UserModel = model("user", userSchema);
export default UserModel;