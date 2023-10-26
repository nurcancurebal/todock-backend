const mongoose = require('mongoose');
const ModelTodo = require("../../models/todo");
const ModelTodoItem = require("../../models/todo-item");

module.exports = async function (req, res) {

    try {

        const params = req.params;

        const _id = new mongoose.Types.ObjectId(params.id);

        await ModelTodo.deleteMany({ _id });
        await ModelTodoItem.deleteMany({ todoId: _id });

        res.send();

    } catch (error) {

        console.error(error);
        res.status(400);
        res.send({ message: error.message });

    };
}