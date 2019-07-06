// Фреймворк веб-приложений.
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
// HTTP request logger middleware for node.js.
// Логгирование деталей запросов.
const morgan = require('morgan');

app.use(morgan('dev'));

const path = require('path');

mongoose.connect('mongodb://localhost/NASA', { useNewUrlParser: true });

// Обработка POST запросов (вместо импорта body parser).
// urlencoded.
app.use(express.urlencoded({ extended: true }));
// json.
app.use(express.json());

// Add local variables (api keys)
app.use((req, res, next) => {
  app.locals.nasaApi = process.env.NASA_API_KEY;
  app.locals.mapsApi = process.env.MAPS_API_KEY;
  next();
});

// Импорт маршрутов.
const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');

// Подключаем статику
app.use(express.static(path.join(__dirname, 'public')));

// Подключаем views(hbs)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Подключаем импортированные маршруты с определенным url префиксом.
app.use('/', indexRouter);
// app.use('/users', usersRouter);

// Обработка ошибок.
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
