const mongoose = require("mongoose");

const Model = mongoose.model("TodoItem", {
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  todoId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  item: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
});

module.exports = Model;
