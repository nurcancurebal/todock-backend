const express = require("express");
const router = express.Router();

router.get("/todos", require('../controllers/todos/list-all'));

router.post("/todos", require('../controllers/todos/create-one'));

router.put("/todos/:id", require('../controllers/todos/update-one'));

router.delete("/todos/:id", require('../controllers/todos/delete-one'));

router.get("/todo-items/:id", require('../controllers/todo-items/list-one'));

router.post("/todo-items", require('../controllers/todo-items/create-one'));

router.put("/todo-items/:id", require('../controllers/todo-items/update-one'));

router.delete("/todo-items/:id", require('../controllers/todo-items/delete-one'));

router.get("/users", require('../controllers/users/user-all'));

router.post("/users/signup", require('../controllers/users/create-user'));

router.put("/users/editaccount/:id", require('../controllers/users/update-user'));

router.put("/users/editpassword/:id", require('../controllers/users/update-user-password'));

module.exports = router;