const jwt = require('jwt-decode');
const { getAdminByUuid } = require('../libs/admin');
const { getEmployeeByUuid } = require('../libs/employee');

const checkValidateEmployee = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(400).send({ error: 'No token provided' });
    return;
  }
  try {
    const destatusd = jwt(token);
    if (!destatusd.sub) {
      res.status(401).send({ error: 'Not authorized' });
      return;
    }
    if (destatusd.exp < (Date.now() / 1000)) {
      res.status(401).send({ error: 'Token expired' });
      return;
    }
    const employee = await getEmployeeByUuid(destatusd.sub);
    if (!employee) {
      res.status(401).send({ error: 'Not authorized' });
      return;
    }
    res.locals.employee = employee;
    next();
  } catch (err) {
    res.status(400).send({ error: 'Invalid token' });
  }
};

const checkValidateAdmin = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(400).send({ error: 'No token provided' });
    return;
  }
  try {
    const destatusd = jwt(token);
    if (!destatusd.sub) {
      res.status(401).send({ error: 'Not authorized' });
      return;
    }
    if (destatusd.iat < (Date.now() / 1000)) {
      res.status(401).send({ error: 'Token expired' });
      return;
    }
    const admin = await getAdminByUuid(destatusd.sub);
    if (!admin) {
      res.status(401).send({ error: 'Not authorized' });
      return;
    }
    res.locals.admin = admin;
    next();
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: 'Invalid token' });
  }
};

module.exports = {
  checkValidateEmployee,
  checkValidateAdmin,
};
