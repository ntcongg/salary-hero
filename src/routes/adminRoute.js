const { Router } = require('express');
const { body } = require('express-validator');
const adminController = require('../controllers/adminController');

const router = Router();

router.post('/', body('companyId').isNumeric().withMessage('Only number allowed in companyId.')
    ,body('email').isEmail().withMessage('Invalid email'), adminController.handleCreateAdmin);

module.exports = router;
