const ModelTodo = require("../../models/todo");
const ModelTodoItem = require("../../models/todo-item");

module.exports = async function (_req, res, next) {
  try {
    const userId = res.locals.user._id;

    let result = await ModelTodo.find({ userId });

    result = Array.from(result).map((item) => item._doc);

    for (let index = 0; index < result.length; index++) {
      const element = result[index];

      element.items = await ModelTodoItem.find({
        todoId: element._id,
        userId,
      });
    }

    return res.send(result);
  } catch (error) {
    return next(error);
  }
};
