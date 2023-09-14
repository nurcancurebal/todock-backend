module.exports = async function (req, res) {

    try {

        let result = await ModelTodoItems.find();

        result = Array.from(result).map(item => item._doc);

        res.send(result);

    } catch (error) {

        console.error(error);
        res.status(400);
        res.send({ message: error.message });

    };
}