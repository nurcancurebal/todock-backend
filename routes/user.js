const express = require("express");
const router = express.Router()

router.use(require("../middlewares/auth"));

router.put("/:id", require('../controllers/user/update-one'));

module.exports = router;