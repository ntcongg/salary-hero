const { validationResult } = require('express-validator');
const {
  createEmployee, deleteEmployee, getEmployeeById, updateEmployee,
  getEmployeeByEmailOrPhoneNumber, upsertEmployee, logEmployeeHistory,
} = require('../libs/employee');
const { moneyRequest, totalMoneyRequested } = require('../libs/moneyRequest');
const { positionHistory } = require('../libs/upsertHistory');

const handleGetEmployee = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    console.log({ errors: errors.array() });
    return;
  }
  try {
    const employee = await getEmployeeById(req.query.id);
    if (employee) {
      res.send(employee);
    } else {
      res.status(404).send('Can not find employee');
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

const handleCreateEmployee = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    console.log({ errors: errors.array() });
    return;
  }
  try {
    const { companyid, id } = res.locals.admin;
    const {
      email, firstName, lastName, position, salary, address, dob, phoneNumber,
    } = req.body;
    const employee = await getEmployeeByEmailOrPhoneNumber(email, phoneNumber);
    if (employee) {
      res.status(404).send('Email or phone number is already used');
      return;
    }
    const newEmployee = await createEmployee(companyid, email,
      firstName, lastName, position, salary, address, new Date(dob), phoneNumber);
    logEmployeeHistory(id, newEmployee.id);
    res.send(newEmployee);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

const handleUpdateEmployee = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    console.log({ errors: errors.array() });
    return;
  }
  try {
    const {
      id, firstName, lastName, salary, address, dob,
    } = req.body;
    const employee = await getEmployeeById(id);
    if (employee) {
      const newEmployee = await updateEmployee(id, firstName,
        lastName, salary, address, new Date(dob));
      res.send(newEmployee);
    } else {
      res.status(404).send('Can not find employee');
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

const handleUpsertEmployee = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    console.log({ errors: errors.array() });
    return;
  }
  try {
    const {
      id, position,
    } = req.body;
    const employee = await getEmployeeById(id);
    const { admin } = res.locals;
    if (employee) {
      const newEmployee = await upsertEmployee(id, position);
      res.send(newEmployee);
      positionHistory(admin.id, employee.id, employee.position, position);
    } else {
      res.status(404).send('Can not find employee');
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

const handleDeleteEmployee = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    console.log({ errors: errors.array() });
    return;
  }
  try {
    const employee = await getEmployeeById(req.query.id);
    if (employee) {
      await deleteEmployee(req.query.id);
      res.send('Employee is deleted');
    } else {
      res.status(404).send('Can not find employee');
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

const handleEmployeeRequestMoney = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    console.log({ errors: errors.array() });
    return;
  }
  try {
    const { amount } = req.body;
    const { id, salary } = res.locals.employee;
    const totalRequested = await totalMoneyRequested(id);
    if ((amount + totalRequested.sum) > (salary / 2)) {
      res.status(400).send('Request denied! Sum of requested amount for this month is over 50% of your salary');
      return;
    }
    await moneyRequest(id, amount);
    res.send('Request is accepted and processing for banking');
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

module.exports = {
  handleGetEmployee,
  handleCreateEmployee,
  handleUpdateEmployee,
  handleDeleteEmployee,
  handleUpsertEmployee,
  handleEmployeeRequestMoney,
};
