const { Op } = require("sequelize");
const { Student, Group, Curriculum, Course, CurriculumCourse, Semester, SemesterCourse } = require("../models");
const semesterCourseRepository = require("../repositories/semesterCourseRepository");
const enrollmentRepository = require("../repositories/enrollmentRepository");
const studentRepository = require("../repositories/studentRepository");
const courseRepository = require("../repositories/courseRepository");
const ApiError = require("../utils/apiError");

const listAvailableCourses = async (studentUserId) => {
  const student = await Student.findByPk(studentUserId, {
    include: [{ model: Group, as: "group", include: [{ model: Curriculum, as: "curriculum" }] }],
  });
  if (!student) {
    throw new ApiError(404, "Student profile not found");
  }

  const curriculumCourses = await CurriculumCourse.findAll({
    where: { curriculum_id: student.group.curriculum_id },
    include: [{ model: Course, as: "course" }],
  });

  const activeSemesterCourses = await SemesterCourse.findAll({
    where: { is_active: true },
    include: [
      {
        model: Semester,
        as: "semester",
        where: { is_active: true },
      },
      { model: Course, as: "course" },
    ],
  });

  return {
    suggestedCourses: curriculumCourses.map((item) => ({
      course_id: item.course_id,
      suggested_semester: item.suggested_semester,
      course: item.course,
    })),
    activeSemesterCourses,
  };
};

const enrollByCourseCode = async (studentUserId, courseCode) => {
  const student = await studentRepository.findByUserId(studentUserId);
  if (!student) {
    throw new ApiError(404, "Student profile not found");
  }

  const course = await courseRepository.findByCode(courseCode);
  if (!course) {
    throw new ApiError(404, "Course code not found");
  }

  const today = new Date().toISOString().slice(0, 10);
  const semesterCourse = await SemesterCourse.findOne({
    include: [
      {
        model: Semester,
        as: "semester",
        where: {
          is_active: true,
          reg_start_date: { [Op.lte]: today },
          reg_end_date: { [Op.gte]: today },
        },
      },
      {
        model: Course,
        as: "course",
        where: { course_code: courseCode },
      },
    ],
  });

  if (!semesterCourse) {
    throw new ApiError(400, "Active registration window for this course was not found");
  }

  const exists = await semesterCourseRepository.findEnrollment(studentUserId, semesterCourse.id);
  if (exists) {
    throw new ApiError(409, "Student already enrolled in this course");
  }

  return enrollmentRepository.create({
    student_id: studentUserId,
    semester_course_id: semesterCourse.id,
    course_code: courseCode,
    grade: 0,
  });
};

const getAcademicHistory = (studentUserId) => enrollmentRepository.listByStudentId(studentUserId);
const getProfile = (studentUserId) => studentRepository.findByUserId(studentUserId);

module.exports = {
  listAvailableCourses,
  enrollByCourseCode,
  getAcademicHistory,
  getProfile,
};
