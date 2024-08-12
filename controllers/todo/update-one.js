const { ObjectId } = require("mongoose").Types;

const ModelTodo = require("../../models/todo");

module.exports = async function (req, res, next) {
  try {
    const _id = new ObjectId(req.params.id);

    const userId = res.locals.user._id;
    const { title } = req?.body;

    if (title.length > 20) {
      throw new Error("Başlık 20 karakterden fazla olamaz");
    }

    await ModelTodo.updateOne({ _id, userId }, title);

    res.send();
  } catch (error) {
    return next(error);
  }
};
