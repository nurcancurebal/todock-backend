const { ObjectId } = require("mongoose").Types;

const ModelTodoItem = require("../../models/todo-item");

module.exports = async function (req, res, next) {
  try {
    const body = req.body;
    const todo_id = new ObjectId(req.params.todoId);
    const userId = res.locals.user._id;

    if (!body?.item) throw new Error("Item not found!");

    let result = await ModelTodoItem.find({
      userId,
      todoId: todo_id,
    });

    const data = {
      item: body.item,
      userId,
      todoId: todo_id,
      order: result.length,
    };

    const resultData = await ModelTodoItem.create(data);

    res.send(resultData._doc);
  } catch (error) {
    return next(error);
  }
};
