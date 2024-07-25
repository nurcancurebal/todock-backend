const { ObjectId } = require("mongoose").Types;

const ModelTodo = require("../../models/todo");

module.exports = async function (req, res, next) {
  try {
    const dragId = new ObjectId(req.params.dragId);
    const dropId = new ObjectId(req.params.dropId);

    const user = res.locals.user;

    const body = req.body;

    const dragOrder = body.dragOrder;
    const dropOrder = body.dropOrder;

    await ModelTodo.updateOne(
      { _id: dragId, userId: user._id },
      { order: dropOrder }
    );
    await ModelTodo.updateOne(
      { _id: dropId, userId: user._id },
      { order: dragOrder }
    );

    res.send();
  } catch (error) {
    return next(error);
  }
};
