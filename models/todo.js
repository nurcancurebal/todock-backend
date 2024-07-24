const mongoose = require("mongoose");

const Model = mongoose.model("Todo", {
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
});

module.exports = Model;
