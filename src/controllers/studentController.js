const asyncHandler = require("../utils/asyncHandler");
const studentService = require("../services/studentService");

const getProfile = asyncHandler(async (req, res) => {
  res.json({ success: true, data: await studentService.getProfile(req.user.id) });
});
const listAvailableCourses = asyncHandler(async (req, res) => {
  res.json({ success: true, data: await studentService.listAvailableCourses(req.user.id) });
});
const enroll = asyncHandler(async (req, res) => {
  res.status(201).json({ success: true, data: await studentService.enrollByCourseCode(req.user.id, req.body.course_code) });
});
const history = asyncHandler(async (req, res) => {
  res.json({ success: true, data: await studentService.getAcademicHistory(req.user.id) });
});

module.exports = { getProfile, listAvailableCourses, enroll, history };
