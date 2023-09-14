const mongoose = require('mongoose');
const ModelTodos = require("../../models/todos");
const ModelTodoItems = require("../../models/todo-items");

module.exports = async function (req, res) {

    try {

        const params = req.params;

        const _id = new mongoose.Types.ObjectId(params.id);

        await ModelTodos.deleteMany({ _id });
        await ModelTodoItems.deleteMany({ todoId: _id });

        res.send();

    } catch (error) {

        console.error(error);
        res.status(400);
        res.send({ message: error.message });

    };
}