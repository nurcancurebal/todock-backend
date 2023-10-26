const express = require("express");
const router = express.Router();

router.use(require("../middlewares/auth"));

router.get("/", require('../controllers/todo/list-all'));
router.post("/", require('../controllers/todo/create-one'));
router.put("/:id", require('../controllers/todo/update-one'));
router.delete("/:id", require('../controllers/todo/delete-one'));

module.exports = router;