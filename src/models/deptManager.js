const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "DeptManager",
    {
      department_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
      manager_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    },
    { tableName: "dept_managers", timestamps: false }
  );
