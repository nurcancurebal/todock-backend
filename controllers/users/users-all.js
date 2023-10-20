const ModelUsers = require("../../models/users");
const ModelTodos = require("../../models/todos");
const ModelTodoItems = require("../../models/todo-items");

module.exports = async function (req, res) {

    try {

        let result = await ModelUsers.find();

        result = Array.from(result).map(item => item._doc);

        for (let index = 0; index < result.length; index++) {

            const element = result[index];

            element.todos = await ModelTodos.find({ userId: element._id });
            element.todos.items = await ModelTodoItems.find({ userId: element._id });
        };

        res.send(result);

    } catch (error) {

        console.error(error);
        res.status(400);
        res.send({ message: error.message });

    };
}