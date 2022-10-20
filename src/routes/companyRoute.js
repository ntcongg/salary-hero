const express = require('express');
const { checkValidateToken } = require('../services/authenticationService');

const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.post('/', checkValidateToken, employeeController.handleGeneratePDF);

module.exports = router;
