const Task = require('../models/task');

const mainPage = async (req, res) => {
  const tasks = await Task.find();
  return res.render('index', { tasks });
};

const completeTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  await Task.findByIdAndUpdate(id, { status: !task.status });
  return res.redirect('/todos/list');
};

module.exports = {
  mainPage,
  completeTask
};
