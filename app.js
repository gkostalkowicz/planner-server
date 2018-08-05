var express = require('express');
var createError = require('http-errors');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require('mongoose');
var eventRouter = require('./event/eventController');


const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// ==============================================================
// routes and middleware

// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(cors());

// routers
app.use('/events', eventRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


// ==============================================================
// MongoDB

const mongoUrl = process.env.MONGODB_URI;
mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl)
    .catch((error) => {
        console.log('MongoDB connection error:', error);
        process.exit(0);
    });


console.log('Server started');
module.exports = app;
