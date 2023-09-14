const ModelTodos = require("../../models/todos");

module.exports = async function (req, res) { //req gelen data

    try {

        const body = req.body;

        await ModelTodos.create(body);

        res.send();

    } catch (error) {

        console.error(error);
        res.status(400);
        res.send({ message: error.message });

    };

}