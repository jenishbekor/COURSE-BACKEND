const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "Curriculum",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING(255), allowNull: false },
      department_id: { type: DataTypes.INTEGER, allowNull: false },
      academic_year_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    { tableName: "curriculums", timestamps: true, underscored: true }
  );
