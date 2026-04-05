const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "Semester",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      academic_year_id: { type: DataTypes.INTEGER, allowNull: false },
      semester_name: { type: DataTypes.STRING(100), allowNull: false },
      is_active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      reg_start_date: { type: DataTypes.DATEONLY, allowNull: false },
      reg_end_date: { type: DataTypes.DATEONLY, allowNull: false },
      start_date: { type: DataTypes.DATEONLY, allowNull: false },
      end_date: { type: DataTypes.DATEONLY, allowNull: false },
    },
    { tableName: "semesters", timestamps: true, underscored: true }
  );
