const ModelTodo = require("../../models/todo");
const ModelTodoItem = require("../../models/todo-item");

module.exports = async function (_req, res, next) {
  try {
    const userId = res.locals.user._id;

    let result = await ModelTodo.find({ userId });

    result = Array.from(result)
      .map((item) => item._doc)
      .sort((a, b) => a.order - b.order);

    for (let index = 0; index < result.length; index++) {
      const element = result[index];

      element.items = await ModelTodoItem.find({
        todoId: element._id,
        userId,
      });

      element.items.sort((a, b) => a.order - b.order);
    }

    return res.send(result);
  } catch (error) {
    return next(error);
  }
};
