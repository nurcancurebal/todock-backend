const { ObjectId } = require("mongoose").Types;

const ModelTodoItem = require("../../models/todo-item");

module.exports = async function (req, res, next) {
  try {
    const dragTodoId = new ObjectId(req.params.dragTodoId);
    const dropTodoId = new ObjectId(req.params.dropTodoId);
    const dragId = new ObjectId(req.params.dragId);
    const dropId = new ObjectId(req.params.dropId);

    const user = res.locals.user;

    const body = req.body;

    const dragItem = body.dragItem;
    const dropItem = body.dropItem;

    await ModelTodoItem.updateOne(
      { _id: dragId, userId: user._id, todoId: dragTodoId },
      { item: dropItem }
    );
    await ModelTodoItem.updateOne(
      { _id: dropId, userId: user._id, todoId: dropTodoId },
      { item: dragItem }
    );

    res.send();
  } catch (error) {
    return next(error);
  }
};
