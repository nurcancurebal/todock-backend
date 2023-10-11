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

router.get("/auth", require('../controllers/users/users-all'));
router.post("/auth", require('../controllers/users/create-user'));
router.put("/auth/:id", require('../controllers/users/update-user'));

module.exports = router; // nodejs özelliğidir. router ı kullan diyor