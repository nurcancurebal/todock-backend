const ModelTodo = require("../../models/todo");

module.exports = async function (req, res, next) {

    try {

        const body = req.body;

        if (!body?.title) throw new Error("Title not found!");

        const user = res.locals.user;

        const data = {
            title: body.title,
            userId: user._id
        };

        await ModelTodo.create(data);

        return res.send();

    } catch (error) {

        return next(error);

    };

};