const { ObjectId } = require("mongoose").Types;

const ModelTodo = require("../../models/todo");
const ModelTodoItem = require("../../models/todo-item");

module.exports = async function (req, res, next) {
  try {
    const _id = new ObjectId(req.params.id);
    const userId = res.locals.user._id;

    const deletedTodo = await ModelTodo.findOne({ _id, userId });
    const deletedOrder = deletedTodo._doc.order;

    await ModelTodo.deleteOne({ _id, userId });
    await ModelTodoItem.deleteMany({ todoId: _id, userId });

    const todosToUpdate = await ModelTodo.find({
      order: { $gt: deletedOrder },
      userId,
    });
    for (const todo of todosToUpdate) {
      await ModelTodo.updateOne(
        { _id: todo._doc._id },
        { $inc: { order: -1 } }
      );
    }

    res.send();
  } catch (error) {
    return next(error);
  }
};
