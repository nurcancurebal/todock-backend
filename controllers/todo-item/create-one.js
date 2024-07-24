const { ObjectId } = require("mongoose").Types;

const ModelTodoItem = require("../../models/todo-item");

module.exports = async function (req, res, next) {
  try {
    const body = req.body;
    const todo_id = new ObjectId(req.params.todoId);
    const user = res.locals.user;

    if (!body?.item) throw new Error("Item not found!");

    let result = await ModelTodoItem.find({
      userId: user._id,
      todoId: todo_id,
    });

    const data = {
      item: body.item,
      userId: user._id,
      todoId: todo_id,
      order: result.length,
    };

    const resultData = await ModelTodoItem.create(data);

    res.send(resultData._doc);
  } catch (error) {
    return next(error);
  }
};
