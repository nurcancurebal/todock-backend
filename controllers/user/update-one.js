const ModelUser = require("../../models/user");

module.exports = async function (req, res) {

    try {

        const params = req.params;
        const body = req.body;

        const findUser = await ModelUser.findByIdAndUpdate(params.id, body);

        if (!findUser) {
            throw new Error("Not found user!!!");
        };

        res.send();

    } catch (error) {

        console.error(error);
        res.status(400);
        res.send({ message: error.message });

    };

}