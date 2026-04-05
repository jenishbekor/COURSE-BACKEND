const { Sequelize } = require("sequelize");

const storage = process.env.DB_STORAGE || "./data/students-course-management.sqlite";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage,
  logging: false,
});

module.exports = sequelize;
