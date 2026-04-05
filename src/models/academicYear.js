const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "AcademicYear",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      year_range: { type: DataTypes.STRING(20), allowNull: false, unique: true },
    },
    { tableName: "academic_years", timestamps: false }
  );
