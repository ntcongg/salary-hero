let db = null;
require('./dbConnect').init().then((database) => { db = database; });

const createAdmin = async (companyId, email, name) => {
  const newAdmin = await db.query(
    `INSERT INTO "admins" ("companyid", "email", "name")
      VALUES ($1, $2, $3) RETURNING *`,
    [
      companyId,
      email,
      name
    ],
  );
  return newAdmin.rows[0];
};

const getAdminByUuid = async (uuid) => {
  const admin = await db.query(
    'SELECT * FROM "admins" WHERE uuid = $1',
    [
      uuid,
    ],
  );
  return admin.rows[0];
};

const getAdminById = async (id) => {
  const admin = await db.query(
    'SELECT * FROM "admins" WHERE id = $1',
    [
      id,
    ],
  );
  return admin.rows[0];
};

const getAdminByEmail = async (email) => {
  const admin = await db.query(
    'SELECT * FROM "admins" WHERE email = $1',
    [
      email,
    ],
  );
  return admin.rows[0];
};

module.exports = { createAdmin, getAdminByUuid, getAdminById, getAdminByEmail };
