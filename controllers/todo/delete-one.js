const { ObjectId } = require("mongoose").Types;

const ModelTodo = require("../../models/todo");
const ModelTodoItem = require("../../models/todo-item");

module.exports = async function (req, res, next) {

    try {

        const _id = new ObjectId(req.params.id);

        const user = res.locals.user;

        await ModelTodo.deleteMany({ _id, userId: user._id });
        await ModelTodoItem.deleteMany({ todoId: _id, userId: user._id });

        res.send();

    } catch (error) {

        return next(error);

    };
}