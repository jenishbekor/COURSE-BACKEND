const asyncHandler = require("../utils/asyncHandler");
const teacherService = require("../services/teacherService");

const listMyCourses = asyncHandler(async (req, res) => {
  res.json({ success: true, data: await teacherService.listMyCourses(req.user.id) });
});
const updateSyllabus = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: await teacherService.updateSyllabus(req.user.id, req.params.semesterCourseId, req.body.syllabus),
  });
});
const gradeStudent = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: await teacherService.gradeStudent(
      req.user.id,
      req.params.semesterCourseId,
      req.body.student_id,
      req.body.grade
    ),
  });
});

module.exports = { listMyCourses, updateSyllabus, gradeStudent };
