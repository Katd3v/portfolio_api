const mongoose = require("mongoose");

const skillSchema = mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: String, required: true },
  iconeLogo: { type: String, required: true },
});

module.exports = mongoose.model("Skills", skillSchema);
