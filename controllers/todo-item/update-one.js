const ModelTodoItem = require("../../models/todo-item");

module.exports = async function (req, res, next) {

    try {

        const params = req.params;
        const body = req.body;

        const findOneTodoItem = await ModelTodoItem.findByIdAndUpdate(params.id, body);

        if (!findOneTodoItem) {
            throw new Error("Not found todo item!!!");
        };

        res.send();

    } catch (error) {

        return next(error);

    };

}