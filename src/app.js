const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');

// Initialize
const app = express();
mongoose.connect('mongodb://localhost/todo-mongo', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(db => console.log('DB Connected'))
  .catch(err => console.log(err));

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
mongoose.set('useFindAndModify', false);

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use(require('./routes/router'));
app.use((req, res) => {
  res.status(404).send({
    statusCode: 404,
    message: 'Not Found',
    errorDetails: []
  });
});

// Server
app.listen(app.get('port'), () => {
  console.log('Server running on port', app.get('port'));
});
