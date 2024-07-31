const { ObjectId } = require("mongoose").Types;

const ModelTodoItem = require("../../models/todo-item");

module.exports = async function (req, res, next) {
  try {
    const dragTodoId = new ObjectId(req.params.dragTodoId);
    const dropTodoId = new ObjectId(req.params.dropTodoId);
    const userId = res.locals.user._id;

    const { dragOrder, dropOrder, dragName, dragId, dropId } = req.body;

    let todoItems = await ModelTodoItem.find({ userId, todoId: dropTodoId });

    if (dragTodoId.equals(dropTodoId)) {
      await ModelTodoItem.updateOne(
        { _id: dragId, userId, todoId: dragTodoId },
        { order: dropOrder }
      );

      await ModelTodoItem.updateOne(
        { _id: dropId, userId, todoId: dropTodoId },
        { order: dragOrder }
      );
    } else if (!dragTodoId.equals(dropTodoId)) {
      await ModelTodoItem.deleteOne({
        userId,
        todoId: dragTodoId,
        _id: dragId,
      });

      const todoItemToUpdate = await ModelTodoItem.find({
        order: { $gt: dragOrder },
        userId,
        todoId: dragTodoId,
      });

      for (const todoItem of todoItemToUpdate) {
        await ModelTodoItem.updateOne(
          { _id: todoItem._doc._id },
          { $inc: { order: -1 } }
        );
      }

      await ModelTodoItem.create({
        name: dragName,
        userId,
        todoId: dropTodoId,
        order: todoItems.length,
      });
    } else {
      throw new Error("Drag Drop Item Error!");
    }

    res.send();
  } catch (error) {
    return next(error);
  }
};
