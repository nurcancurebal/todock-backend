const { ObjectId } = require("mongoose").Types;

const ModelTodoItem = require("../../models/todo-item");

module.exports = async function (req, res, next) {
  try {
    const dragTodoId = new ObjectId(req.params.dragTodoId);
    const dropTodoId = new ObjectId(req.params.dropTodoId);
    const userId = res.locals.user._id;

    const { dragOrder, dropOrder, dragItem, dragId } = req.body;

    let todoItems = await ModelTodoItem.find({ userId, todoId: dropTodoId });

    if (dragTodoId.equals(dropTodoId)) {
      todoItems = Array.from(todoItems).map((item) => item._doc);

      if (dragOrder < dropOrder) {
        const itemsToUpdate = todoItems.filter(
          (item) => item.order > dragOrder && item.order <= dropOrder
        );

        for (const item of itemsToUpdate) {
          await ModelTodoItem.updateOne(
            { _id: item._id },
            { $inc: { order: -1 } }
          );
        }
      } else if (dragOrder > dropOrder) {
        const itemToUpdate = todoItems.filter(
          (item) => item.order < dragOrder && item.order >= dropOrder
        );

        for (const item of itemToUpdate) {
          await ModelTodoItem.updateOne(
            { _id: item._id },
            { $inc: { order: 1 } }
          );
        }
      } else {
        throw new Error("Drag Drop Item Error!");
      }

      await ModelTodoItem.updateOne(
        { _id: dragId, userId, todoId: dragTodoId },
        { order: dropOrder }
      );
    } else if (!dragTodoId.equals(dropTodoId)) {
      await ModelTodoItem.deleteOne({
        userId,
        todoId: dragTodoId,
        _id: dragId,
      });

      await ModelTodoItem.create({
        item: dragItem,
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
