const express = require('express');
const router = express.Router();

// Resources
const { tasksResources, listResources } = require('../resources');

// Methods
router.use('/todos/list', listResources);
router.use('/todos', tasksResources);

module.exports = router;
