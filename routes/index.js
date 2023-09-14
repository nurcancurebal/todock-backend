const express = require("express");
const router = express.Router();

const ModelTodos = require("../models/todos");
const ModelTodoItems = require("../models/todo-items");
const ModelUsers = require("../models/users");

router.get("/todos", async (req, res) => {

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
});

router.post("/todos", async (req, res) => { //req gelen data

    try {

        const body = req.body;

        await ModelTodos.create(body);

        res.send();

    } catch (error) {

        console.error(error);
        res.status(400);
        res.send({ message: error.message });

    };

});

router.put("/todos/:id", async (req, res) => {

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

});

router.delete("/todos/:id", async (req, res) => {

    try {

        const params = req.params;

        const _id = new mongoose.Types.ObjectId(params.id);

        await ModelTodos.deleteMany({ _id });
        await ModelTodoItems.deleteMany({ todoId: _id });

        res.send();

    } catch (error) {

        console.error(error);
        res.status(400);
        res.send({ message: error.message });

    };

});

router.get("/todo-items/:id", async (req, res) => {

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

});

router.post("/todo-items", async (req, res) => {

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

});

router.put("/todo-items/:id", async (req, res) => {

    try {

        const params = req.params;
        const body = req.body;

        const findOneTodoItem = await ModelTodoItems.findByIdAndUpdate(params.id, body);

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

router.delete("/todo-items/:id", async (req, res) => {

    try {

        const params = req.params;

        const findOneTodoItem = await ModelTodoItems.findByIdAndDelete(params.id);

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


router.get("/users", async (req, res) => {

    try {

        let result = await ModelTodoItems.find();

        result = Array.from(result).map(item => item._doc);

        res.send(result);

    } catch (error) {

        console.error(error);
        res.status(400);
        res.send({ message: error.message });

    };
});


router.post("/users/signup", async (req, res) => { //req gelen data

    try {

        const body = req.body;

        await ModelUsers.create(body);

        res.send();

    } catch (error) {

        console.error(error);
        res.status(400);
        res.send({ message: error.message });

    };

});

router.put("/todos/editaccount/:id", async (req, res) => {

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

});

router.put("/todos/editpassword/:id", async (req, res) => {

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

});

router.delete("/todos/deleteaccount/:id", async (req, res) => {

    try {

        const params = req.params;

        const findUser = await ModelUsers.findByIdAndDelete(params.id);

        if (!findUser) {
            throw new Error("Not found user!!!");
        };

        res.send();

    } catch (error) {

        console.error(error);
        res.status(400);
        res.send({ message: error.message });

    };

});

module.exports = router;