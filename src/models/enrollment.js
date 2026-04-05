const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "Enrollment",
    {
      student_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
      semester_course_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
      course_code: { type: DataTypes.STRING(20), allowNull: false },
      grade: { type: DataTypes.DECIMAL(5, 2), allowNull: false, defaultValue: 0 },
    },
    { tableName: "enrollments", timestamps: true, underscored: true }
  );
