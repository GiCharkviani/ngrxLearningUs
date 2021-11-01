const mongoose = require("mongoose");

const country = mongoose.Schema({
  country: { type: String, required: true },
  capital: { type: String, required: true },
});

module.exports = mongoose.model("Country", country);
