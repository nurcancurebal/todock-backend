const express = require("express");
const router = express.Router();

router.use(require("../middlewares/auth"));

router.post("/:todoId", require('../controllers/todo-item/create-one'));
router.put("/:todoId/:itemId", require('../controllers/todo-item/update-one'));
router.delete("/:todoId/:itemId", require('../controllers/todo-item/delete-one'));

module.exports = router;