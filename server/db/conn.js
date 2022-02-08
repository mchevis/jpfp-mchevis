const Sequelize = require("sequelize");
const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost:5432/jpfp-template-a-flex",
  {
    logging: false,
  }
);

module.exports = conn;
