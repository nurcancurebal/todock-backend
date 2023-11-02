const ModelUser = require("../../models/user");

module.exports = async function (req, res, next) {

    try {

        const user = res.locals.user;

        const findUser = await ModelUser.findOne(user._id);

        if (!findUser) {
            throw new Error("Not found user!!!");
        };

        res.status(202).json(findUser._doc)

    } catch (error) {

        return next(error);

    };

}