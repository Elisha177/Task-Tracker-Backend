const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, assignedTo, priority } = req.body;
    const task = new Task({
      title,
      description,
      dueDate,
      assignedTo,
      createdBy: req.user.id,
      priority,
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user.id }).populate('assignedTo');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add updateTask and deleteTask methods similarly

exports.updateTask = async (req, res) => {
    try {
      const { id } = req.params; // Task ID from request parameters
      const { title, description, dueDate, assignedTo, priority, status } = req.body;
  
      // Find and update the task
      const updatedTask = await Task.findOneAndUpdate(
        { _id: id, createdBy: req.user.id }, // Match task by ID and user
        { title, description, dueDate, assignedTo, priority, status }, // New values to update
        { new: true, runValidators: true } // Return updated task and validate input
      );
  
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found or not authorized to update' });
      }
  
      res.json(updatedTask);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  // Delete Task
  exports.deleteTask = async (req, res) => {
    try {
      const { id } = req.params; // Task ID from request parameters
  
      // Find and delete the task
      const deletedTask = await Task.findOneAndDelete({ _id: id, createdBy: req.user.id });
  
      if (!deletedTask) {
        return res.status(404).json({ message: 'Task not found or not authorized to delete' });
      }
  
      res.json({ message: 'Task deleted successfully', task: deletedTask });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  