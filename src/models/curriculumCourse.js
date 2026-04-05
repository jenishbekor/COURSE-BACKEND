const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "CurriculumCourse",
    {
      curriculum_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
      course_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
      suggested_semester: { type: DataTypes.INTEGER, allowNull: false },
    },
    { tableName: "curriculum_courses", timestamps: false }
  );
