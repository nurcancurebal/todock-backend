const express = require("express");
const router = express.Router();

const routerTodos = require("./todos");
const routerAuth = require("./auth");

router.use("/auth", routerAuth);
router.use("/todos", routerTodos);

router.get("/todo-items", require('../controllers/todo-items/list-one'));
router.post("/todo-items", require('../controllers/todo-items/create-one'));
router.put("/todo-items/:id", require('../controllers/todo-items/update-one'));
router.delete("/todo-items/:id", require('../controllers/todo-items/delete-one'));

router.get("/user", require('../controllers/users/users-all'));
router.post("/user", require('../controllers/users/create-user'));
router.put("/user/:id", require('../controllers/users/update-user'));

module.exports = router;