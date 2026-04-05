const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "Course",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      course_code: { type: DataTypes.STRING(20), allowNull: false, unique: true },
      course_name: { type: DataTypes.STRING(255), allowNull: false },
      credits: { type: DataTypes.INTEGER, allowNull: false },
      hours: { type: DataTypes.INTEGER, allowNull: false },
      cycle: { type: DataTypes.STRING(100), allowNull: false },
      type: {
        type: DataTypes.ENUM("basic", "elective", "variational"),
        allowNull: false,
      },
      department_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    { tableName: "courses", timestamps: true, underscored: true }
  );
