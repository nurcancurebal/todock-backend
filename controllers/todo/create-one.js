const ModelTodo = require("../../models/todo");

module.exports = async function (req, res, next) {
  try {
    const body = req.body;

    if (!body?.title) throw new Error("Title not found!");

    const userId = res.locals.user._id;

    let result = await ModelTodo.find({ userId });

    const data = {
      title: body.title,
      userId,
      order: result.length,
    };

    const resultData = await ModelTodo.create(data);

    return res.send(resultData._doc);
  } catch (error) {
    return next(error);
  }
};
