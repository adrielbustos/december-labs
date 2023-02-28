import { Schema, model } from "mongoose";
const badgeSchema = new Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
badgeSchema.set('versionKey', false);
const BadgeModel = model("badge", badgeSchema);
export default BadgeModel;