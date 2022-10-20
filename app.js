const express = require('express');
const logger = require('morgan');
const YAML = require('yamljs');

const swaggerDocument = YAML.load('./src/routes/swagger.yaml');
const swaggerUi = require('swagger-ui-express');
const emailRouter = require('./src/routes/employeeRoute');
const adminRouter = require('./src/routes/adminRoute');
const companyRouter = require('./src/routes/companyRoute');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/health', require('express-healthcheck')({
  healthy() {
    return { everything: 'is ok' };
  },
}));

app.use('/company', companyRouter);
app.use('/admin', adminRouter);
app.use('/employee', emailRouter);

module.exports = app;
