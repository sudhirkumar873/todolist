const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  due_date: {
    type: String,
  },
  priority: {
    type: String,
  },
  description: {
    type: String,
  },
  assignee: {
    type: String,
  },
  status: {
    type: String,
  },
});

const Todo = mongoose.model("todo", todoSchema);

module.exports = Todo;
