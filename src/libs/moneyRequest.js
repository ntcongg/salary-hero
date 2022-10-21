let db = null;
require('./dbConnect').init().then((database) => { db = database; });

const moneyRequest = async (id, amount) => {
  const newRequest = await db.query(
    `INSERT INTO "money_request" ("employeeid", "amount", "status")
      VALUES ($1, $2, $3) RETURNING *`,
    [
      id, amount, 'REQUESTED',
    ],
  );
  return newRequest.rows[0];
};

const totalMoneyRequested = async (id) => {
  const total = await db.query(
    'SELECT SUM(amount) from "money_request" WHERE employeeid = $1 AND money_request.requesteddate >= date_trunc(\'month\', CURRENT_DATE)',
    [
      id,
    ],
  );
  return total.rows[0];
};

module.exports = { moneyRequest, totalMoneyRequested };
