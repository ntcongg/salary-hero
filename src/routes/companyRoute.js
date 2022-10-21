const { Router } = require('express');
const { body } = require('express-validator');
const { query } = require('express-validator');
const companyController = require('../controllers/companyController');

const router = Router();

router.get('/', companyController.handleGetCompany);
router.post(
  '/create',
  body('name')
    .isString()
    .withMessage('Only letters and digits allowed in name.')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Name too short. Enter a longer name!'),
  body('description')
    .isString()
    .withMessage('Only letters and digits allowed in description.')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Description too short. Enter a longer description!'),
  body('address', 'Adress is invalid or empty').isString()
    .withMessage('Only letters and digits allowed in description.')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Description too short. Enter a longer description!'),
  companyController.handleCreateCompany,
);
router.post(
  '/update',
  body('id', 'company id must be a number').isNumeric(),
  body('name')
    .isString()
    .withMessage('Only letters and digits allowed in name.')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Name too short. Enter a longer name!'),
  body('description')
    .isString()
    .withMessage('Only letters and digits allowed in description.')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Description too short. Enter a longer description!'),
  body('address', 'Adress is invalid or empty').isString()
    .withMessage('Only letters and digits allowed in description.')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Description too short. Enter a longer description!'),
  companyController.handleUpdateCompany,
);
router.delete(
  '/delete',
  [query('id', 'Company id must be a number').isNumeric()],
  companyController.handleDeleteCompany,
);

module.exports = router;
