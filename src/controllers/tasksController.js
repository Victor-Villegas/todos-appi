const { validationResult } = require('express-validator');
const Task = require('../models/task');

const getTasks = async (req, res) => {
  const tasks = await Task.find();
  return res.status(200).send(tasks);
};

const getTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);

  if (!task) {
    return res.status(404).send({
      statusCode: 404,
      message: 'Not Found',
      errorDetails: []
    });
  }

  return res.status(200).send(task);
};

const createTask = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = errors.array().shift();

    return res.status(422).send({
      statusCode: 422,
      message: 'Syntax error',
      errorDetails: error
    });
  }

  const { body } = req;

  const task = new Task(body);
  await task.save();
  return res.status(201).send({
    _id: task._id,
    statusCode: 201,
    message: 'Element created'
  });
};

const updateTask = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = errors.array().shift();

    return res.status(422).send({
      statusCode: 422,
      message: 'Syntax error',
      errorDetails: error
    });
  }

  const { id } = req.params;
  const { body } = req;
  const result = await Task.findByIdAndUpdate(id, body);

  if (!result) {
    return res.status(404).send({
      statusCode: 404,
      message: 'Not Found',
      errorDetails: []
    });
  }

  return res.status(200).send({
    statusCode: 200,
    message: 'Element updated'
  });
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  const result = await Task.deleteOne({ _id: id });

  if (!result.deletedCount) {
    return res.status(404).send({
      statusCode: 404,
      message: 'Not Found',
      errorDetails: []
    });
  }

  return res.status(200).send({
    statusCode: 200,
    message: 'Element deleted'
  });
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
};
