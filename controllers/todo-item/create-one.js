const ModelTodo = require("../../models/todo");
const ModelTodoItem = require("../../models/todo-item");
const ModelUser = require("../../models/user");

module.exports = async function (req, res) {

    try {

        const body = req.body;

        if (!body.todoId || !body.name || !body.userId) {
            throw new Error("Bad Request!!!");
        };

        const findOneTodo = await ModelTodo.findById(body.todoId);
        const findOneUser = await ModelUser.findById(body.userId);

        if (!findOneTodo || !findOneUser) {
            throw new Error("Not found todo or user!!!");
        };

        await ModelTodoItem.create(body);

        res.send();

    } catch (error) {

        console.error(error);
        res.status(400);
        res.send({ message: error.message });

    };

}