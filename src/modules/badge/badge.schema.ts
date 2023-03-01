import { Schema, model } from "mongoose";
const badgeSchema = new Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: false
});
badgeSchema.set('versionKey', false);
const BadgeModel = model("badge", badgeSchema);
export default BadgeModel;