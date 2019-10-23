const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
const port = 8080;

app.use('/channels', (_req, res) =>
  res.json(channels));

app.use('/messages/:channel',
    (req, res) => {
  console.log(messages[req.params.channel])
  res.json(messages[req.params.channel])
});

app.use('/sent',
    (req, res) => {
  console.log(req.body);
messages[req.body.channel].push(req.body.message);
res.status(201).end();
});


const channels = [
  'channel1',
  'channel2',
  'channel3',
  'channel4',
  'channel5',
];

const messages = {
  'channel1':['kapil.kapil','sdsds'],
  'channel2':[],
  'channel3':[],
  'channel4':[],
  'channel5':[],
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
