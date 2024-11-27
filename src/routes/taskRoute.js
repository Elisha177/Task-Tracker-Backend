const express = require('express');
const { createTask, getTasks,updateTask,deleteTask } = require('../controllers/taskController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authenticate, authorize(['admin', 'user']), createTask);
router.get('/', authenticate, getTasks);

// Update a task
router.put('/:id', authenticate, updateTask);

// Delete a task
router.delete('/:id', authenticate, deleteTask);

module.exports = router;
