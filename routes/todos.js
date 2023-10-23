const express = require("express");
const router = express.Router();

router.get("/", require('../controllers/todos/list-all'));
router.post("/", require('../controllers/todos/create-one'));
router.put("/:id", require('../controllers/todos/update-one'));
router.delete("/:id", require('../controllers/todos/delete-one'));

module.exports = router;