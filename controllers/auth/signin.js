const ModelUsers = require("../../models/users");

module.exports = async function (req, res) {

    try {

        console.log("")

        let result = await ModelUsers.find();

        res.send(result);

    } catch (error) {

        console.error(error);
        res.status(400);
        res.send({ message: error.message });

    };
}