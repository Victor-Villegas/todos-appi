const express = require('express');
const listResources = express.Router();

// Controller
const { listController } = require('../controllers');

// Routes - /todos/list
listResources.get('/', listController.mainPage);

listResources.get('/status/:id', listController.completeTask);

module.exports = listResources;
