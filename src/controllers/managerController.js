const asyncHandler = require("../utils/asyncHandler");
const managerService = require("../services/managerService");

const createCourse = asyncHandler(async (req, res) => {
  res.status(201).json({ success: true, data: await managerService.createCourse(req.body) });
});
const listCourses = asyncHandler(async (_req, res) => {
  res.json({ success: true, data: await managerService.listCourses() });
});
const createCurriculum = asyncHandler(async (req, res) => {
  res.status(201).json({ success: true, data: await managerService.createCurriculum(req.body) });
});
const listCurriculums = asyncHandler(async (_req, res) => {
  res.json({ success: true, data: await managerService.listCurriculums() });
});
const addCourseToCurriculum = asyncHandler(async (req, res) => {
  res.status(201).json({ success: true, data: await managerService.addCourseToCurriculum(req.body) });
});
const activateSemesterCourse = asyncHandler(async (req, res) => {
  res.status(201).json({ success: true, data: await managerService.activateSemesterCourse(req.body) });
});
const updateSemesterStatus = asyncHandler(async (req, res) => {
  res.json({ success: true, data: await managerService.updateSemesterStatus(req.params.semesterId, req.body) });
});
const listSemesterCourses = asyncHandler(async (_req, res) => {
  res.json({ success: true, data: await managerService.listSemesterCourses() });
});

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
