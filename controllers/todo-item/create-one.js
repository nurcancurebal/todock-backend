const { ObjectId } = require("mongoose").Types;

const ModelTodoItem = require("../../models/todo-item");

module.exports = async function (req, res, next) {
  try {
    const { name } = req.body;
    const todo_id = new ObjectId(req.params.todoId);
    const userId = res.locals.user._id;

    if (!name) throw new Error("Name not found!");

    let result = await ModelTodoItem.find({
      userId,
      todoId: todo_id,
    });

    if (name.length > 200) throw new Error("Kart 200 karakterden fazla olamaz");

    if (result.length >= 30)
      throw new Error(
        "Yeni kart eklenemiyor. Kart sayısı yeterli sınıra ulaştı"
      );

    const data = {
      name,
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
