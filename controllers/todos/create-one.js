const ModelTodos = require("../../models/todos");
const ModelUsers = require("../../models/users");

module.exports = async function (req, res) {

    try {

        const body = req.body;

        if (!body.userId || !body.title) {
            throw new Error("Bad Request!!!");
        };

        const findOneUsers = await ModelUsers.findById(body.userId);

        if (!findOneUsers) {
            throw new Error("Not found user!!!");
        };

        await ModelTodos.create(body);

        res.send();

    } catch (error) {

        console.error(error);
        res.status(400);
        res.send({ message: error.message });

    };

}