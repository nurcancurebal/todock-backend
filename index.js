// ? Node modules.
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');

// ? Constants.
const PORT = process.env.PORT || 3000;

// ? Database connection and conf.
mongoose.connection
    .on('error', error => {
        console.error("MongoDB", error);
    })
    .on('open', () => {
        console.log("MongoDB", "Database Connected");
    });
mongoose.connect('mongodb://127.0.0.1:27017/ToDock');

// ? Database todos collection.
const Todos = mongoose.model('Todos',
    {
        title: {
            type: String,
            required: true
        }
    }
);

// ? Database items collection.
const TodoItems = mongoose.model('TodoItems',
    {
        todoId: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        description: String,
    }
);

// ? Express application create.
const app = express();

// ? Middlewares.
app.use(cors( {
    origin: '*'
  }))|
app.use(express.json());

// ? Controllers.
app.get("/todos", async (req, res) => {

    try {

        let result = await Todos.find();

        result = Array.from(result).map(item => item._doc);

        for (let index = 0; index < result.length; index++) {
            const element = result[index];
            element.items = await TodoItems.find({ todoId: element._id });
        };

        res.send(result);

    } catch (error) {

        console.error(error);
        res.status(400);
        res.send({ message: error.message });

    };

});

app.post("/todos", async (req, res) => { //req gelen data

    try {

        const body = req.body;

        await Todos.create(body);

        res.send();

    } catch (error) {

        console.error(error);
        res.status(400);
        res.send({ message: error.message });

    };

});

app.put("/todos/:id", async (req, res) => {

    try {

        const params = req.params;
        const body = req.body;

        const findOneTodoItem = await Todos.findByIdAndUpdate(params.id, body);

        if (!findOneTodoItem) {
            throw new Error("Not found todo!!!");
        };

        res.send();

    } catch (error) {

        console.error(error);
        res.status(400);
        res.send({ message: error.message });

    };

});

app.delete("/todos/:id", async (req, res) => {

    try {

        const params = req.params;

        const _id = new mongoose.Types.ObjectId(params.id);

        await Todos.deleteMany({ _id });
        await TodoItems.deleteMany({ todoId: _id });

        res.send();

    } catch (error) {

        console.error(error);
        res.status(400);
        res.send({ message: error.message });

    };

});

app.get("/todo-items/:id", async (req, res) => {

    try {

        const params = req.params;

        const findOneTodoItem = await TodoItems.findById(params.id);

        if (!findOneTodoItem) {
            throw new Error("Not found todo item!!!");
        };

        res.send(findOneTodoItem);

    } catch (error) {

        console.error(error);
        res.status(400);
        res.send({ message: error.message });

    };

});

app.post("/todo-items", async (req, res) => {

    try {

        const body = req.body;

        if (!body.todoId || !body.name) {
            throw new Error("Bad Request!!!");
        };

        const findOneTodos = await Todos.findById(body.todoId);

        if (!findOneTodos) {
            throw new Error("Not found todo!!!");
        };

        await TodoItems.create(body);

        res.send();

    } catch (error) {

        console.error(error);
        res.status(400);
        res.send({ message: error.message });

    };

});

app.put("/todo-items/:id", async (req, res) => {

    try {

        const params = req.params;
        const body = req.body;

        const findOneTodoItem = await TodoItems.findByIdAndUpdate(params.id, body);

        if (!findOneTodoItem) {
            throw new Error("Not found todo item!!!");
        };

        res.send();

    } catch (error) {

        console.error(error);
        res.status(400);
        res.send({ message: error.message });

    };

});

app.delete("/todo-items/:id", async (req, res) => {

    try {

        const params = req.params;

        const findOneTodoItem = await TodoItems.findByIdAndDelete(params.id);

        if (!findOneTodoItem) {
            throw new Error("Not found todo item!!!");
        };

        res.send();

    } catch (error) {

        console.error(error);
        res.status(400);
        res.send({ message: error.message });

    };

});

// ? Server listen.
app.listen(PORT, () => {
    console.log("Listening api server", `http://localhost:${PORT}`);
});