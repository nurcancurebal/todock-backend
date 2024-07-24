const { ObjectId } = require("mongoose").Types;

const ModelTodo = require("../../models/todo");

module.exports = async function (req, res, next) {
  try {
    const _id = new ObjectId(req.params.id);

    const user = res.locals.user;
    const body = req.body;

    await ModelTodo.updateOne({ _id, userId: user._id }, body);

    res.send();
  } catch (error) {
    return next(error);
  }
};
