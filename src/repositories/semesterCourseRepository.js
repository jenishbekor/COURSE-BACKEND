const { SemesterCourse, Semester, Course, User, Student, Enrollment } = require("../models");

const create = (payload) => SemesterCourse.create(payload);
const findById = (id) =>
  SemesterCourse.findByPk(id, {
    include: [
      { model: Semester, as: "semester" },
      { model: Course, as: "course" },
      { model: User, as: "teacher", attributes: { exclude: ["password"] } },
      { model: Student, as: "students", through: { attributes: ["grade", "course_code"] } },
    ],
  });
const listAll = () =>
  SemesterCourse.findAll({
    include: [
      { model: Semester, as: "semester" },
      { model: Course, as: "course" },
      { model: User, as: "teacher", attributes: { exclude: ["password"] } },
    ],
  });
const updateById = async (id, payload) => {
  await SemesterCourse.update(payload, { where: { id } });
  return findById(id);
};
const listByTeacherId = (teacherId) =>
  SemesterCourse.findAll({
    where: { teacher_id: teacherId },
    include: [
      { model: Semester, as: "semester" },
      { model: Course, as: "course" },
      { model: Student, as: "students", through: { attributes: ["grade", "course_code"] } },
    ],
  });
const findEnrollment = (student_id, semester_course_id) =>
  Enrollment.findOne({ where: { student_id, semester_course_id } });

module.exports = {
  create,
  findById,
  listAll,
  updateById,
  listByTeacherId,
  findEnrollment,
};
