const { ObjectId } = require("mongoose").Types;

const ModelTodoItem = require("../../models/todo-item");

module.exports = async function (req, res, next) {

    try {

        const item_id = new ObjectId(req.params.itemId);
        const todo_id = new ObjectId(req.params.todoId);
        const user = res.locals.user;

        await ModelTodoItem.deleteOne({ userId: user._id, todoId: todo_id, _id: item_id });

        res.send();

    } catch (error) {

        return next(error);

    };

}