const { validationResult } = require('express-validator');
const {
  createCompany, deleteCompany, getCompanyById, updateCompany,
} = require('../libs/company');

const handleGetCompany = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    console.log({ errors: errors.array() });
    return;
  }
  try {
    const company = await getCompanyById(req.query.id);
    if (company) {
      res.send(company);
    } else {
      res.status(404).send('Can not find company');
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

const handleCreateCompany = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    console.log({ errors: errors.array() });
    return;
  }
  try {
    const { name, address, description } = req.body;
    const newCompany = await createCompany(name, address, description);
    res.send(newCompany);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

const handleUpdateCompany = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    console.log({ errors: errors.array() });
    return;
  }
  try {
    const {
      id, name, address, description,
    } = req.body;
    const company = await getCompanyById(id);
    if (company) {
      const newCompany = await updateCompany(id, name, address, description);
      res.send(newCompany);
    } else {
      res.status(404).send('Can not find company');
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

const handleDeleteCompany = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    console.log({ errors: errors.array() });
    return;
  }
  try {
    const company = await getCompanyById(req.query.id);
    if (company) {
      await deleteCompany(req.query.id);
      res.send('Company is deleted');
    } else {
      res.status(404).send('Can not find company');
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

module.exports = {
  handleGetCompany,
  handleCreateCompany,
  handleUpdateCompany,
  handleDeleteCompany,
};
