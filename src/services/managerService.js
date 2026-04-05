const curriculumRepository = require("../repositories/curriculumRepository");
const courseRepository = require("../repositories/courseRepository");
const semesterCourseRepository = require("../repositories/semesterCourseRepository");
const academicRepository = require("../repositories/academicRepository");
const userRepository = require("../repositories/userRepository");
const ApiError = require("../utils/apiError");

const createCourse = (payload) => courseRepository.create(payload);
const listCourses = () => courseRepository.findAll();
const createCurriculum = (payload) => curriculumRepository.create(payload);
const listCurriculums = () => curriculumRepository.findAll();

const addCourseToCurriculum = async (payload) => {
  const curriculum = await curriculumRepository.findById(payload.curriculum_id);
  const course = await courseRepository.findById(payload.course_id);

  if (!curriculum || !course) {
    throw new ApiError(404, "Curriculum or course not found");
  }

  return curriculumRepository.addCourse(payload);
};

const activateSemesterCourse = async (payload) => {
  const semester = await academicRepository.getSemester(payload.semester_id);
  const course = await courseRepository.findById(payload.course_id);
  const teacher = await userRepository.findById(payload.teacher_id);

  if (!semester || !course || !teacher) {
    throw new ApiError(404, "Semester, course, or teacher not found");
  }

  if (teacher.role.role_name !== "Teacher") {
    throw new ApiError(400, "Selected user is not a teacher");
  }

  return semesterCourseRepository.create(payload);
};

const updateSemesterStatus = async (semesterId, payload) => {
  return academicRepository.updateSemester(semesterId, payload);
};

const listSemesterCourses = () => semesterCourseRepository.listAll();

module.exports = {
  createCourse,
  listCourses,
  createCurriculum,
  listCurriculums,
  addCourseToCurriculum,
  activateSemesterCourse,
  updateSemesterStatus,
  listSemesterCourses,
};
