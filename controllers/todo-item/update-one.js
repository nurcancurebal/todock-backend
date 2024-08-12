const { ObjectId } = require("mongoose").Types;

const ModelTodoItem = require("../../models/todo-item");

module.exports = async function (req, res, next) {
  try {
    const item_id = new ObjectId(req.params.itemId);
    const todo_id = new ObjectId(req.params.todoId);

    const userId = res.locals.user._id;
    const { name } = req.body;

    if (name.length > 200) throw new Error("Kart 200 karakterden fazla olamaz");

    await ModelTodoItem.updateOne(
      { _id: item_id, todoId: todo_id, userId },
      name
    );

    res.send();
  } catch (error) {
    return next(error);
  }
};
