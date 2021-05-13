const express = require('express');
const tasksResources = express.Router();
const { check } = require('express-validator');

// Controller
const { tasksController } = require('../controllers');

// Routes - /todos
tasksResources.get('/', tasksController.getTasks);
tasksResources.get('/:id', tasksController.getTask);

tasksResources.post('/', [
  check('title')
    .exists().withMessage('Title property not found')
    .isString().withMessage('Title property must be a string'),
  check('description')
    .exists().withMessage('Description property not found')
    .isString().withMessage('Description property must be a string'),
  check('status')
    .optional()
    .isBoolean().withMessage('Status property must be a boolean')
], tasksController.createTask);

tasksResources.put('/:id', [
  check('title')
    .optional()
    .isString().withMessage('Title property must be a string'),
  check('description')
    .optional()
    .isString().withMessage('Description property must be a string'),
  check('status')
    .optional()
    .isBoolean().withMessage('Status property must be a boolean')
], tasksController.updateTask);

tasksResources.delete('/:id', tasksController.deleteTask);

module.exports = tasksResources;
