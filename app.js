const express = require('express');
const logger = require('morgan');

const employeeRouter = require('./src/routes/employeeRoute');
const adminRouter = require('./src/routes/adminRoute');
const companyRouter = require('./src/routes/companyRoute');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/company', companyRouter);
app.use('/admin', adminRouter);
app.use('/employee', employeeRouter);
app.use('/health', require('express-healthcheck')({
  healthy() {
    return { everything: 'is ok' };
  },
}));

module.exports = app;
