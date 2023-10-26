const ModelUser = require("../../models/user");

module.exports = async function (req, res, next) {

    try {

        const params = req.params;
        const body = req.body;

        const findUser = await ModelUser.findByIdAndUpdate(params.id, body);

        if (!findUser) {
            throw new Error("Not found user!!!");
        };

        res.send();

    } catch (error) {

        return next(error);

    };

}