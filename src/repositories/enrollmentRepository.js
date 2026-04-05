const { Enrollment, SemesterCourse, Course, Semester } = require("../models");

const create = (payload) => Enrollment.create(payload);
const updateGrade = async (student_id, semester_course_id, grade) => {
  await Enrollment.update({ grade }, { where: { student_id, semester_course_id } });
  return Enrollment.findOne({ where: { student_id, semester_course_id } });
};
const listByStudentId = (student_id) =>
  Enrollment.findAll({
    where: { student_id },
    include: [
      {
        model: SemesterCourse,
        as: "semesterCourse",
        include: [
          { model: Course, as: "course" },
          { model: Semester, as: "semester" },
        ],
      },
    ],
  });

module.exports = { create, updateGrade, listByStudentId };
