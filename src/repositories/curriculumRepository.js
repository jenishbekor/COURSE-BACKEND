const {
  Curriculum,
  Course,
  CurriculumCourse,
  Department,
  AcademicYear,
} = require("../models");

const create = (payload) => Curriculum.create(payload);
const findAll = () =>
  Curriculum.findAll({
    include: [
      { model: Department, as: "department" },
      { model: AcademicYear, as: "academicYear" },
      { model: Course, as: "courses", through: { attributes: ["suggested_semester"] } },
    ],
  });
const findById = (id) =>
  Curriculum.findByPk(id, {
    include: [{ model: Course, as: "courses", through: { attributes: ["suggested_semester"] } }],
  });
const addCourse = (payload) => CurriculumCourse.create(payload);

module.exports = { create, findAll, findById, addCourse };
