module.exports = async function (req, res) {

    try {

        const body = req.body;

        await ModelUsers.create(body);

        res.send();

    } catch (error) {

        console.error(error);
        res.status(400);
        res.send({ message: error.message });

    };

}