const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  pageUrl: { type: String, required: true },
  github: { type: String, required: true },
  languages: { type: Array, required: true },
});

module.exports = mongoose.model("Project", projectSchema);
