const { ObjectId } = require("mongoose").Types;

const ModelTodo = require("../../models/todo");

module.exports = async function (req, res, next) {
  try {
    const dragId = new ObjectId(req.params.dragId);
    const dragOrder = req.body.dragOrder;
    const dropOrder = req.body.dropOrder;
    const userId = res.locals.user._id;

    let todos = await ModelTodo.find({ userId });
    todos = Array.from(todos).map((item) => item._doc);

    if (dragOrder < dropOrder) {
      const titleToUpdate = todos.filter(
        (item) => item.order > dragOrder && item.order <= dropOrder
      );

      for (const title of titleToUpdate) {
        await ModelTodo.updateOne({ _id: title._id }, { $inc: { order: -1 } });
      }
    } else if (dragOrder > dropOrder) {
      const titleToUpdate = todos.filter(
        (item) => item.order < dragOrder && item.order >= dropOrder
      );

      for (const title of titleToUpdate) {
        await ModelTodo.updateOne({ _id: title._id }, { $inc: { order: 1 } });
      }
    } else {
      throw new Error("Drag Drop Error!");
    }

    await ModelTodo.updateOne({ _id: dragId, userId }, { order: dropOrder });

    res.send();
  } catch (error) {
    return next(error);
  }
};
