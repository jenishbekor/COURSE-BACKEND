const express = require("express");
const adminController = require("../controllers/adminController");

const router = express.Router();

router.get("/departments", adminController.listDepartments);
router.post("/departments", adminController.createDepartment);
router.post("/departments/:departmentId/managers", adminController.assignManager);
router.get("/academic-years", adminController.listAcademicYears);
router.post("/academic-years", adminController.createAcademicYear);
router.get("/semesters", adminController.listSemesters);
router.post("/semesters", adminController.createSemester);
router.get("/users", adminController.listUsers);
router.post("/users", adminController.createUser);
router.patch("/users/:id", adminController.updateUser);
router.get("/groups", adminController.listGroups);
router.post("/groups", adminController.createGroup);
router.get("/students", adminController.listStudents);

module.exports = router;
