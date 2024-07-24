const ModelTodo = require("../../models/todo");

module.exports = async function (req, res, next) {
  try {
    const body = req.body;

    if (!body?.title) throw new Error("Title not found!");

    const user = res.locals.user;

    let result = await ModelTodo.find({ userId: user._id });

    const data = {
      title: body.title,
      userId: user._id,
      order: result.length,
    };

    const resultData = await ModelTodo.create(data);

    return res.send(resultData._doc);
  } catch (error) {
    return next(error);
  }
};
