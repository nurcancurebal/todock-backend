const ModelTodos = require("../../models/todos");
const ModelTodoItems = require("../../models/todo-items");
const ModelUsers = require("../../models/users");

module.exports = async function (req, res) {

    try {

        const body = req.body;

        if (!body.todoId || !body.name || !body.userId) {
            throw new Error("Bad Request!!!");
        };

        const findOneTodos = await ModelTodos.findById(body.todoId);
        const findOneUsers = await ModelUsers.findById(body.userId);

        if (!findOneTodos || !findOneUsers) {
            throw new Error("Not found todo or users!!!");
        };

        await ModelTodoItems.create(body);

        res.send();

    } catch (error) {

        console.error(error);
        res.status(400);
        res.send({ message: error.message });

    };

}