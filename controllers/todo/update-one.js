const { ObjectId } = require("mongoose").Types;

const ModelTodo = require("../../models/todo");

module.exports = async function (req, res, next) {
  try {
    const _id = new ObjectId(req.params.id);

    const userId = res.locals.user._id;
    const body = req.body;

    await ModelTodo.updateOne({ _id, userId }, body);

    res.send();
  } catch (error) {
    return next(error);
  }
};
