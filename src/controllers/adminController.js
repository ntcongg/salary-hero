const { validationResult } = require('express-validator');
const { createAdmin, getAdminByEmail } = require('../libs/admin');
const { getCompanyById } = require('../libs/company');

const handleCreateAdmin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    console.log({ errors: errors.array() });
    return;
  }
  try {
    const { companyId, email, name } = req.body;
    const admin = await getAdminByEmail(email);
    if(admin){
      res.status(400).send('Email is already exsist');
      return;
    }
    const company = await getCompanyById(companyId);
    if (!company) {
      res.status(404).send('Can not find company');
      return;
    }
    const newAdmin = await createAdmin(companyId, email, name );
    res.send(newAdmin);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

module.exports = { handleCreateAdmin };
