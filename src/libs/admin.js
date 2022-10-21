let db = null;
require('./dbConnect').init().then((database) => { db = database; });

const createAdmin = async (companyId) => {
  const newAdmin = await db.query(
    `INSERT INTO "admins" ("companyid")
      VALUES ($1) RETURNING *`,
    [
      companyId,
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

module.exports = { createAdmin, getAdminByUuid, getAdminById };
