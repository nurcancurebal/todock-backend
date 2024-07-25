const express = require("express");
const router = express.Router();

router.use(require("../middlewares/auth"));

router.put(
  "/title/change/order/:dragId/:dropId",
  require("../controllers/drag-drop/title-change-order")
);

router.put(
  "/item/change/:dragTodoId/:dropTodoId/:dragId/:dropId",
  require("../controllers/drag-drop/item-change")
);

module.exports = router;
