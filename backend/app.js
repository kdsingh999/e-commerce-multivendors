const connectDatabase = require('./db/database.js');
const express = require('express');
const ErrorHandler = require('./utils/ErrorHandler.js');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user.js');
if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config({
    path: 'backend/config/config.env',
  });
}

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/user', userRouter);

connectDatabase();

//It's for ErrorHandling
app.use(ErrorHandler);
module.exports = app;
