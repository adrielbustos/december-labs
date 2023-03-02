import { Schema, model } from "mongoose";
const logSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  info: {
    type: String,
  }
}, {
  timestamps: false
});
logSchema.set('versionKey', false);
const LogModel = model("log", logSchema);
export default LogModel;