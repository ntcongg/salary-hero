const { Router } = require('express');
const { body } = require('express-validator');
const adminController = require('../controllers/adminController');

const router = Router();

router.post('/create', body('companyId').isNumeric().withMessage('Only number allowed in companyId.'), adminController.handleCreateAdmin);

module.exports = router;
