const express = require("express");
const teacherController = require("../controllers/teacherController");

const router = express.Router();

router.get("/courses", teacherController.listMyCourses);
router.patch("/semester-courses/:semesterCourseId/syllabus", teacherController.updateSyllabus);
router.patch("/semester-courses/:semesterCourseId/grade", teacherController.gradeStudent);

module.exports = router;
