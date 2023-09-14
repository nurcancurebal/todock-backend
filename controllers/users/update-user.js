module.exports = async function (req, res) {

    try {

        const params = req.params;
        const body = req.body;

        const findUsers = await ModelUsers.findByIdAndUpdate(params.id, body);

        if (!findUsers) {
            throw new Error("Not found users!!!");
        };

        res.send();

    } catch (error) {

        console.error(error);
        res.status(400);
        res.send({ message: error.message });

    };

}