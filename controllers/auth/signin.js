const jwt = require("jsonwebtoken");
const md5 = require("md5");

const ModelUser = require("../../models/user");

const { SECRET_KEY } = process.env;

module.exports = async function (req, res, next) {
  try {
    const { username } = req?.body;
    const { password } = req?.body;

    if (!username) throw new Error("Username not found!");
    if (!password) throw new Error("Password not found!");

    const resultUser = await ModelUser.findOne({ username });

    if (!resultUser) throw new Error("User not found!");

    const hashedPassword = md5(password);

    if (hashedPassword != resultUser.password) throw new Error("Unauthorized!");

    const token = jwt.sign({ id: resultUser._id.toString() }, SECRET_KEY);

    return res.send({ token });
  } catch (error) {
    error.status = 401;
    return next(error);
  }
};
