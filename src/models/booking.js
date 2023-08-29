const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  caravanId: {
    type: Schema.Types.ObjectId,
    ref: "Caravan",
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('booking', bookingSchema);
