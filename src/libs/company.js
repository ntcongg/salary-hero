let db = null;
require('./dbConnect').init().then((database) => { db = database; });
const moment = require('moment');

const createCompany = async (name, address, description) => {
  const newCompany = await db.query(
    `INSERT INTO "companies" ("name", "address", "description")
      VALUES ($1, $2, $3) RETURNING *`,
    [
      name,
      address,
      description,
    ],
  );
  return newCompany.rows[0];
};

const getCompanyById = async (id) => {
  const result = await db.query(
    'SELECT * FROM "companies" WHERE id = $1',
    [
      id,
    ],

  );
  return result.rows[0];
};

const updateCompany = async (id, name, address, description) => {
  const newCompany = await db.query(
    `UPDATE "companies" SET ("name", "address", "description", "updateddate")
      = ($1, $2, $3, $5) WHERE id = $4 RETURNING *`,
    [
      name,
      address,
      description,
      id,
      new Date(),
    ],
  );
  return newCompany.rows[0];
};

const deleteCompany = async (id) => {
  await db.query(
    'DELETE FROM "companies" WHERE id = $1',
    [
      id,
    ],
  );
};

module.exports = {
  createCompany, updateCompany, getCompanyById, deleteCompany,
};
