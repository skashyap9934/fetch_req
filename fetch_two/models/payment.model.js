const mongoose = require("mongoose");

const PaymentSchema = mongoose.Schema({
  email: { type: String, required: true },
  payment: { type: Object, required: true },
});

const PaymentModel = mongoose.model("payments", PaymentSchema);

module.exports = PaymentModel;
