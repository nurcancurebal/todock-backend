const express = require("express");
const router = express.Router();

router.use(require("../middlewares/auth"));

router.post("/", require('../controllers/todo-item/create-one'));
router.put("/:id", require('../controllers/todo-item/update-one'));
router.delete("/:id", require('../controllers/todo-item/delete-one'));

module.exports = router;