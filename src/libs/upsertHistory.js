let db = null;
require('./dbConnect').init().then((database) => { db = database; });

const positionHistory = async (adminId, employeeId, from, to) => {
  const history = await db.query(
    `INSERT INTO "position_history" ("updateby", "employeeid", "from", "to", "updatedate")
      VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [
      adminId, employeeId, from, to, new Date(),
    ],
  );
  return history.rows[0];
};

module.exports = { positionHistory };
