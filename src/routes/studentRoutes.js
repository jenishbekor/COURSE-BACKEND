const express = require("express");
const studentController = require("../controllers/studentController");

const router = express.Router();

router.get("/me", studentController.getProfile);
router.get("/available-courses", studentController.listAvailableCourses);
router.post("/enrollments", studentController.enroll);
router.get("/history", studentController.history);

module.exports = router;
