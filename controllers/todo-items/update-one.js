const ModelTodoItems = require("../../models/todo-items");

module.exports = async function (req, res) {

    try {

        const params = req.params;
        const body = req.body;

        const findOneTodoItem = await ModelTodoItems.findByIdAndUpdate(params.id, body);

        if (!findOneTodoItem) {
            throw new Error("Not found todo item!!!");
        };

        res.send();

    } catch (error) {

        console.error(error);
        res.status(400);
        res.send({ message: error.message });

    };

}