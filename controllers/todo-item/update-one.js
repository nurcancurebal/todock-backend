const { ObjectId } = require("mongoose").Types;

const ModelTodoItem = require("../../models/todo-item");

module.exports = async function (req, res, next) {

    try {

        const item_id = new ObjectId(req.params.itemId);
        const todo_id = new ObjectId(req.params.todoId);

        const user = res.locals.user;
        const body = req.body;

        const findOneTodoItem = await ModelTodoItem.updateOne({ _id: item_id, todoId: todo_id, userId: user._id }, body);

        if (!findOneTodoItem) {
            throw new Error("Not found todo item!!!");
        };

        res.send();

    } catch (error) {

        return next(error);

    };

}