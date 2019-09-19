var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routes/users');
var guestsRouter = require('./routes/guests');
var artistsRouter = require('./routes/artists');
var ticketsRouter = require('./routes/tickets');
var ordersRouter = require('./routes/orders');
var eventsRouter = require('./routes/events');
var invintationsRouter = require('./routes/invintations');
var testimonialsRouter = require('./routes/testimonials');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/users', usersRouter);
app.use('/guests', guestsRouter);
app.use('/artists', artistsRouter);
app.use('/tickets', ticketsRouter);
app.use('/orders', ordersRouter);
app.use('/events', eventsRouter);
app.use('/invintations', invintationsRouter);
app.use('/testimonials', testimonialsRouter);


// catch 404 and forward to error handlere
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
