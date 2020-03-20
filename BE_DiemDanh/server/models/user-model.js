const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    name: { type: String, required: true },
    checked_in: { type: Boolean, required: false, default: false }
  },
  { timestamps: true }
);
module.exports = mongoose.model("users", User);
