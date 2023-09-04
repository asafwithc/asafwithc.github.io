const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const onlineUserSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    socketId: {
      type: String,
      required: true,
    }
  }
);

module.exports = mongoose.model("onlineUser", onlineUserSchema);
