const ModelTodo = require("../../models/todo");
const ModelTodoItem = require("../../models/todo-item");

module.exports = async function (req, res, next) {

    try {

        const user = res.locals.user;

        let result = await ModelTodo.find({ userId: user._id });

        result = Array.from(result).map(item => item._doc);

        for (let index = 0; index < result.length; index++) {

            const element = result[index];

            element.items = await ModelTodoItem.find({ todoId: element._id, userId: user._id });
        };

        return res.send(result);

    } catch (error) {

        return next(error);

    };
}