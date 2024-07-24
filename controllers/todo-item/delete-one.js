const { ObjectId } = require("mongoose").Types;

const ModelTodoItem = require("../../models/todo-item");

module.exports = async function (req, res, next) {
  try {
    const item_id = new ObjectId(req.params.itemId);
    const todo_id = new ObjectId(req.params.todoId);
    const user = res.locals.user;

    const deletedTodoItem = await ModelTodoItem.findOne({
      _id: item_id,
      todoId: todo_id,
      userId: user._id,
    });
    const deletedOrder = deletedTodoItem._doc.order;

    await ModelTodoItem.deleteOne({
      userId: user._id,
      todoId: todo_id,
      _id: item_id,
    });

    const todoItemToUpdate = await ModelTodoItem.find({
      order: { $gt: deletedOrder },
      userId: user._id,
      todoId: todo_id,
    });

    for (const todo of todoItemToUpdate) {
      await ModelTodoItem.updateOne(
        { _id: todo._doc._id },
        { $inc: { order: -1 } }
      );
    }

    res.send();
  } catch (error) {
    return next(error);
  }
};
