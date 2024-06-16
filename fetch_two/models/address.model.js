const mongoose = require("mongoose");

const AddressSchema = mongoose.Schema({
  email: { type: String, required: true },
  address: { type: Object, required: true },
});

const AddressModel = mongoose.model("address", AddressSchema);

module.exports = AddressModel;
