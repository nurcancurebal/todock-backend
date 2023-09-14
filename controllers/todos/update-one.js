module.exports = async function (req, res) {

    try {

        const params = req.params;
        const body = req.body;

        const findOneTodoItem = await ModelTodos.findByIdAndUpdate(params.id, body);

        if (!findOneTodoItem) {
            throw new Error("Not found todo!!!");
        };

        res.send();

    } catch (error) {

        console.error(error);
        res.status(400);
        res.send({ message: error.message });

    };
}