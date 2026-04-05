const semesterCourseRepository = require("../repositories/semesterCourseRepository");
const enrollmentRepository = require("../repositories/enrollmentRepository");
const ApiError = require("../utils/apiError");

const listMyCourses = (teacherId) => semesterCourseRepository.listByTeacherId(teacherId);

const updateSyllabus = async (teacherId, semesterCourseId, syllabus) => {
  const semesterCourse = await semesterCourseRepository.findById(semesterCourseId);
  if (!semesterCourse) {
    throw new ApiError(404, "Semester course not found");
  }
  if (semesterCourse.teacher_id !== teacherId) {
    throw new ApiError(403, "You can only update your assigned courses");
  }
  return semesterCourseRepository.updateById(semesterCourseId, { syllabus });
};

const gradeStudent = async (teacherId, semesterCourseId, studentId, grade) => {
  const semesterCourse = await semesterCourseRepository.findById(semesterCourseId);
  if (!semesterCourse) {
    throw new ApiError(404, "Semester course not found");
  }
  if (semesterCourse.teacher_id !== teacherId) {
    throw new ApiError(403, "You can only grade students in your assigned courses");
  }

  const enrollment = await semesterCourseRepository.findEnrollment(studentId, semesterCourseId);
  if (!enrollment) {
    throw new ApiError(404, "Student is not enrolled in this course");
  }

  return enrollmentRepository.updateGrade(studentId, semesterCourseId, grade);
};

module.exports = { listMyCourses, updateSyllabus, gradeStudent };
