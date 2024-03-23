const { Router } = require("express");
const todoController = require("../controller/todo");

const router = Router();

router.get("/get_todo", todoController.get_todo);
router.get("/get_todo_by_id/:_id", todoController.get_todo_by_id);
router.post("/add_todo", todoController.add_todo);
router.put("/edit_todo/:_id", todoController.edit_todo);
router.delete("/delete_todo/:_id", todoController.delete_todo);

module.exports = router;
