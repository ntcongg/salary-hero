const { Router } = require('express');
const { query, body } = require('express-validator');
const { checkValidateEmployee, checkValidateAdmin } = require('../services/authenticationService');
const employeeController = require('../controllers/employeeController');

const router = Router();

router.get('/', employeeController.handleGetEmployee);

router.post('/create',
  checkValidateAdmin, body('email').isEmail(), body('phoneNumber').isMobilePhone(), employeeController.handleCreateEmployee);

router.post('/update',
  checkValidateAdmin, employeeController.handleUpdateEmployee);

router.delete('/delete', [query('id', 'Employee id must be a number').isNumeric()], checkValidateAdmin, employeeController.handleDeleteEmployee);

router.post('/upsert',
  checkValidateAdmin, employeeController.handleUpsertEmployee);
router.post('/request-money', checkValidateEmployee, employeeController.handleEmployeeRequestMoney);

module.exports = router;
