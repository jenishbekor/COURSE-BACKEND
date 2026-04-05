const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "Student",
    {
      user_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
      group_id: { type: DataTypes.INTEGER, allowNull: false },
      student_id_number: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    },
    { tableName: "students", timestamps: true, underscored: true }
  );
