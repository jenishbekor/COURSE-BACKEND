const { AcademicYear, Semester } = require("../models");

const createYear = (payload) => AcademicYear.create(payload);
const createSemester = (payload) => Semester.create(payload);
const listYears = () => AcademicYear.findAll({ include: [{ model: Semester, as: "semesters" }] });
const getSemester = (id) => Semester.findByPk(id);
const updateSemester = async (id, payload) => {
  await Semester.update(payload, { where: { id } });
  return getSemester(id);
};
const listSemesters = () => Semester.findAll({ include: [{ model: AcademicYear, as: "academicYear" }] });

module.exports = {
  createYear,
  createSemester,
  listYears,
  getSemester,
  updateSemester,
  listSemesters,
};
