const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Checkin = new Schema(
  {
    status: { type: String },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required:true
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("checkins", Checkin);
