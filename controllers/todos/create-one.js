const ModelTodos = require("../../models/todos");
const ModelUsers = require("../../models/users");

module.exports = async function (req, res) {

    try {

        const body = req.body;

        if (!body?.title) throw new Error("Title not found!");

        const user = res.locals.user;

        const data = {
            title: body.title,
            userId: user._id
        };

        await ModelTodos.create(data);

        return res.send();

    } catch (error) {

        return next(error);

    };

};