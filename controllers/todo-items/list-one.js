module.exports = async function (req, res) {

    try {

        const params = req.params;

        const findOneTodoItem = await ModelTodoItems.findById(params.id);

        if (!findOneTodoItem) {
            throw new Error("Not found todo item!!!");
        };

        res.send(findOneTodoItem);

    } catch (error) {

        console.error(error);
        res.status(400);
        res.send({ message: error.message });

    };
}