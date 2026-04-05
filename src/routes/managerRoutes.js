const express = require("express");
const managerController = require("../controllers/managerController");

const router = express.Router();

router.get("/courses", managerController.listCourses);
router.post("/courses", managerController.createCourse);
router.get("/curriculums", managerController.listCurriculums);
router.post("/curriculums", managerController.createCurriculum);
router.post("/curriculum-courses", managerController.addCourseToCurriculum);
router.get("/semester-courses", managerController.listSemesterCourses);
router.post("/semester-courses", managerController.activateSemesterCourse);
router.patch("/semesters/:semesterId", managerController.updateSemesterStatus);

module.exports = router;
