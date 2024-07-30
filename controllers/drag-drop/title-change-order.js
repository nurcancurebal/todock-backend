const { ObjectId } = require("mongoose").Types;

const ModelTodo = require("../../models/todo");

module.exports = async function (req, res, next) {
  try {
    const dragId = new ObjectId(req.params.dragId);
    const dropId = new ObjectId(req.params.dropId);
    const dragOrder = req.body.dragOrder;
    const dropOrder = req.body.dropOrder;
    const userId = res.locals.user._id;

    await ModelTodo.updateOne({ _id: dragId, userId }, { order: dropOrder });
    await ModelTodo.updateOne({ _id: dropId, userId }, { order: dragOrder });

    res.send();
  } catch (error) {
    return next(error);
  }
};
