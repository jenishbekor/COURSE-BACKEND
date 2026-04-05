const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "SemesterCourse",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      semester_id: { type: DataTypes.INTEGER, allowNull: false },
      course_id: { type: DataTypes.INTEGER, allowNull: false },
      teacher_id: { type: DataTypes.INTEGER, allowNull: false },
      is_active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
      syllabus: { type: DataTypes.TEXT, allowNull: true },
    },
    { tableName: "semester_courses", timestamps: true, underscored: true }
  );
