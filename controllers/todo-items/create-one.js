module.exports = async function (req, res) {

    try {

        const body = req.body;

        if (!body.todoId || !body.name) {
            throw new Error("Bad Request!!!");
        };

        const findOneTodos = await ModelTodos.findById(body.todoId);

        if (!findOneTodos) {
            throw new Error("Not found todo!!!");
        };

        await ModelTodoItems.create(body);

        res.send();

    } catch (error) {

        console.error(error);
        res.status(400);
        res.send({ message: error.message });

    };

}