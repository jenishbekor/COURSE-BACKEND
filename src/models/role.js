const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "Role",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      role_name: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    },
    { tableName: "roles", timestamps: false }
  );
