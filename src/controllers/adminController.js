const { validationResult } = require('express-validator');
const { createAdmin } = require('../libs/admin');
const { getCompanyById } = require('../libs/company');

const handleCreateAdmin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    console.log({ errors: errors.array() });
    return;
  }
  try {
    const { companyId } = req.body;
    const company = await getCompanyById(companyId);
    if (!company) {
      res.status(404).send('Can not find company');
      return;
    }
    const newAdmin = await createAdmin(companyId);
    res.send(newAdmin);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

module.exports = { handleCreateAdmin };
