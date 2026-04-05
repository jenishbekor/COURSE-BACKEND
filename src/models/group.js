const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "Group",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      group_name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
      department_id: { type: DataTypes.INTEGER, allowNull: false },
      curriculum_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    { tableName: "groups", timestamps: true, underscored: true }
  );
