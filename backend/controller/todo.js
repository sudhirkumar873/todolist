const Todo = require("../model/todo");

module.exports.get_todo = async (req, res) => {
  try {
    const response = await Todo.find({});
    res.json({ data: response });
  } catch (error) {
    console.log(error);
  }
};

module.exports.get_todo_by_id = async (req, res) => {
  const { _id } = req.params;
  try {
    const response = await Todo.find({ _id });
    res.json({ data: response });
  } catch (error) {
    console.log(error);
  }
};

module.exports.add_todo = async (req, res) => {
  const { title, due_date, priority, assignee, status, description } = req.body;
  try {
    const response = await Todo.create({
      title,
      due_date,
      priority,
      assignee,
      status,
      description,
    });
    res.json({ data: response });
  } catch (error) {
    console.log(error);
  }
};

module.exports.edit_todo = async (req, res) => {
  const { _id } = req.params; // Assuming the id of the todo to edit is passed in the request parameters
  const { title, due_date, priority, assignee, status, description } = req.body;
  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: _id },
      {
        title,
        due_date,
        priority,
        assignee,
        status,
        description,
      },
      { new: true }
    );
    res.json({ data: updatedTodo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.delete_todo = async (req, res) => {
  const { _id } = req.params; // Assuming the id of the todo to delete is passed in the request parameters
  try {
    const deletedTodo = await Todo.findByIdAndDelete(_id);
    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json({ data: deletedTodo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
