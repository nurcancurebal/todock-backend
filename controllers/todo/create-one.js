const ModelTodo = require("../../models/todo");

module.exports = async function (req, res, next) {
  try {
    const body = req.body;

    if (!body?.title) throw new Error("Title not found!");

    if (body.title.length > 20)
      throw new Error("Başlık 20 karakterden fazla olamaz");

    const userId = res.locals.user._id;

    let result = await ModelTodo.find({ userId });

    if (result.length >= 20)
      throw new Error(
        "Yeni liste eklenemiyor. Liste sayısı yeterli sınıra ulaştı"
      );

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
