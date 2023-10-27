const { ObjectId } = require("mongoose").Types;

const ModelTodoItem = require("../../models/todo-item");

module.exports = async function (req, res, next) {

    try {

        const body = req.body;
        const todo_id = new ObjectId(req.params.todoId);
        const user = res.locals.user;

        const data = {
            name: body.name,
            userId: user._id,
            todoId: todo_id
        };

        await ModelTodoItem.create(data);

        res.send();

    } catch (error) {

        return next(error);

    };

}