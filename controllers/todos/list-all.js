module.exports = async function (req, res) {

    try {

        let result = await ModelTodos.find();

        result = Array.from(result).map(item => item._doc);

        for (let index = 0; index < result.length; index++) {

            const element = result[index];

            element.items = await ModelTodoItems.find({ todoId: element._id });
        };

        res.send(result);

    } catch (error) {

        console.error(error);
        res.status(400);
        res.send({ message: error.message });

    };
}