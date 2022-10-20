const format = require('pg-format');
const db = require('./dbConnect');

const createCompany = async (name) => {
  try {
    db.query(
      `INSERT INTO "email" ("from_name", "from_email", "to", "type", "subject", "scheduled_id", "send_time", "template_id", "extra_params", "protocol", "provider")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        email.fromName,
        email.fromEmail,
        email.to,
        email.type,
        email.subject,
        email.scheduledId,
        email.sendTime,
        email.templateId,
        email.extraParams,
        email.protocol,
        email.provider,
      ],
    );
  } catch (e) {
    console.log(e);
  }
};

const getTemplateById = async (id) => {
  const templates = await db.query(
    'SELECT content FROM email_template WHERE id = $1 LIMIT 1',
    [id],
  );
  return templates.rows[0].content;
};

const getLastestTemplateDefaultLanguage = async (name) => {
  const templates = await db.query(
    'SELECT id, content, content_engine, subject FROM email_template WHERE template_name = $1 ORDER BY version DESC LIMIT 1',
    [name],
  );
  return templates.rows[0];
};

const getLastestTemplate = async (name, language) => {
  let templates = await db.query(
    'SELECT id, content, content_engine, subject FROM email_template WHERE template_name = $1 AND language =$2 ORDER BY version DESC',
    [name, language],
  );
  if (templates.rows[0]) {
    return templates.rows[0];
  }
  // maybe language not found, use default language
  console.log(`Can not find template with name: ${name} and language: ${language} `);
  console.log('Getting template with default language...');
  templates = await getLastestTemplateDefaultLanguage(name);
  return templates;
};

const saveEmail = async (email) => {
  await db.query(
    `INSERT INTO "email" ("from_name", "from_email", "to", "type", "subject", "scheduled_id", "send_time", "template_id", "extra_params", "protocol", "provider")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
    [
      email.fromName,
      email.fromEmail,
      email.to,
      email.type,
      email.subject,
      email.scheduledId,
      email.sendTime,
      email.templateId,
      email.extraParams,
      email.protocol,
      email.provider,
    ],
  );
};

const saveEmails = async (email) => {
  const nestedEmails = email.to.map((destination) => [
    email.fromName,
    email.fromEmail,
    destination,
    email.type,
    email.subject,
    email.scheduledId,
    email.sendTime,
    email.templateId,
    email.extraParams,
    email.protocol,
    email.provider,
  ]);
  await db.query(format(`INSERT INTO "email" ("from_name", "from_email", "to", "type", "subject", "scheduled_id", "send_time", "template_id", "extra_params", "protocol", "provider")
  VALUES %L`, nestedEmails));
};

const saveScheduledEmailCronJob = async (cronJob) => {
  const result = await db.query(
    `INSERT INTO "scheduled_email" ("template_id", "start", "end", "schedule", "is_active", "email_params")
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
    [
      cronJob.templateId,
      new Date(),
      null,
      cronJob.schedule,
      true,
      cronJob.emailParams,
    ],
  );
  return result.rows[0].id;
};

const saveSpecifyTimeEmailCronJob = async (cronJob) => {
  const result = await db.query(
    `INSERT INTO "specify_time_email" ("template_id", "send_time", "is_sent", "email_params")
    VALUES ($1, $2, $3, $4) RETURNING id`,
    [
      cronJob.templateId,
      cronJob.sendTime,
      false,
      cronJob.emailParams,
    ],
  );
  return result.rows[0].id;
};

const updateScheduledEmailStatus = async (id, status) => {
  await db.query(
    'UPDATE "scheduled_email" SET "is_active" = $1 WHERE "id" = $2',
    [status, id],
  );
};

const updateSpecifyTimeEmailStatus = async (id, status) => {
  await db.query(
    'UPDATE specify_time_email SET is_sent = $1 WHERE id = $2',
    [status, id],
  );
};

const getActiveScheduledEmail = async () => {
  const listActiveScheduledEmail = await db.query(
    'SELECT * FROM scheduled_email WHERE is_active = true',
  );
  return listActiveScheduledEmail.rows;
};

const getUnsentSpecifyTimeEmail = async () => {
  const listUnsentEmail = await db.query(
    'SELECT * FROM specify_time_email WHERE is_sent = false',
  );
  return listUnsentEmail.rows;
};

module.exports = {
  getTemplateById,
  saveEmail,
  getLastestTemplate,
  getLastestTemplateDefaultLanguage,
  updateScheduledEmailStatus,
  saveScheduledEmailCronJob,
  getActiveScheduledEmail,
  getUnsentSpecifyTimeEmail,
  saveSpecifyTimeEmailCronJob,
  updateSpecifyTimeEmailStatus,
  saveEmails,
};
