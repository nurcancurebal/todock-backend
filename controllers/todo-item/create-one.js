const { ObjectId } = require("mongoose").Types;

const ModelTodoItem = require("../../models/todo-item");

module.exports = async function (req, res, next) {

    try {

        const body = req.body;
        const params = req.params;

        if (!body?.name) {
            throw new Error("Bad Request!!!");
        };

        const user = res.locals.user;

        const data = {
            name: body.name,
            userId: user._id,
            todoId: new ObjectId(params.id)
        };

        await ModelTodoItem.create(data);

        res.send();

    } catch (error) {

        return next(error);

    };

}