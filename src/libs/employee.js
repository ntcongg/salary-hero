let db = null;
require('./dbConnect').init().then((database) => { db = database; });

const createEmployee = async (companyid, email, firstname,
  lastname, position, salary, address, dob, phonenumber) => {
  const newEmployee = await db.query(
    `INSERT INTO "employees" ("companyid", "email", "firstname", "lastname", "position", "salary", "address", "dob", "phonenumber")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
    [
      companyid, email, firstname, lastname, position, salary, address, dob, phonenumber,
    ],
  );
  return newEmployee.rows[0];
};

const logEmployeeHistory = async (admin, employee) => {
  db.query(
    'INSERT INTO "employee_history" ("addedby", "employeeid") VALUES ($1, $2)',
    [admin, employee],
  );
};

const getEmployeeByUuid = async (uuid) => {
  const employee = await db.query(
    'SELECT * FROM "employees" WHERE uuid = $1',
    [
      uuid,
    ],
  );
  return employee.rows[0];
};

const getEmployeeById = async (id) => {
  const employee = await db.query(
    'SELECT * FROM "employees" WHERE id = $1',
    [
      id,
    ],
  );
  return employee.rows[0];
};

const getEmployeeByEmailOrPhoneNumber = async (email, phone) => {
  const employee = await db.query(
    'SELECT * FROM "employees" WHERE email = $1 OR phonenumber = $2',
    [
      email, phone,
    ],
  );
  return employee.rows[0];
};

const updateEmployee = async (id, firstname,
  lastname, salary, address, dob) => {
  const updated = await db.query(
    `UPDATE "employees" SET ("firstname", "lastname", "salary", "address", "dob", "updateddate")
      = ($1, $2, $3, $4, $5, $6) WHERE id = $7 RETURNING *`,
    [
      firstname, lastname, salary, address, dob, new Date(), id,
    ],
  );
  return updated.rows[0];
};

const upsertEmployee = async (id, position) => {
  const updated = await db.query(
    `UPDATE "employees" SET ("position", "updateddate")
      = ($1, $2) WHERE id = $3 RETURNING *`,
    [
      position, new Date(), id,
    ],
  );
  return updated.rows[0];
};

const deleteEmployee = async (id) => {
  await db.query(
    'DELETE FROM "employees" WHERE id = $1',
    [
      id,
    ],
  );
};

module.exports = {
  createEmployee,
  updateEmployee,
  getEmployeeByUuid,
  deleteEmployee,
  getEmployeeById,
  getEmployeeByEmailOrPhoneNumber,
  upsertEmployee,
  logEmployeeHistory,
};
