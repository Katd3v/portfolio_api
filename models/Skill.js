const mongoose = require("mongoose");

const skillSchema = mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

module.exports = mongoose.model("Skills", skillSchema);
