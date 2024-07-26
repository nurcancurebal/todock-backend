const ModelUser = require("../../models/user");

module.exports = async function (req, res, next) {
  try {
    const userId = res.locals.user._id;
    const body = req.body;

    const findUser = await ModelUser.findByIdAndUpdate(userId, body);

    if (!findUser) {
      throw new Error("Not found user!!!");
    }

    res.send();
  } catch (error) {
    return next(error);
  }
};
