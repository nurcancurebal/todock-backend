const express = require("express");
const router = express.Router();

const routerTodo = require("./todo");
const routerAuth = require("./auth");
const routerTodoItem = require("./todo-item");
const routerUser = require("./user");

router.use("/auth", routerAuth);
router.use("/todo", routerTodo);
router.use("/todo-item", routerTodoItem);
router.use("/user", routerUser);
router.get("/", (_req, res) => {
  res.json({
    message: "TODOCK API - 👋🌎🌍🌏👋",
  });
});

module.exports = router;
