const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "Department",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING(255), allowNull: false, unique: true },
      description: { type: DataTypes.TEXT, allowNull: true },
    },
    { tableName: "departments", timestamps: true, underscored: true }
  );
