const { Client } = require('pg');

module.exports.init = async () => {
  const db = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await db.connect();
  return db;
};
