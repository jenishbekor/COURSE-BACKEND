const asyncHandler = require("../utils/asyncHandler");
const adminService = require("../services/adminService");

const createDepartment = asyncHandler(async (req, res) => {
  const data = await adminService.createDepartment(req.body);
  res.status(201).json({ success: true, data });
});
const listDepartments = asyncHandler(async (_req, res) => {
  res.json({ success: true, data: await adminService.listDepartments() });
});
const createAcademicYear = asyncHandler(async (req, res) => {
  res.status(201).json({ success: true, data: await adminService.createAcademicYear(req.body) });
});
const createSemester = asyncHandler(async (req, res) => {
  res.status(201).json({ success: true, data: await adminService.createSemester(req.body) });
});
const listAcademicYears = asyncHandler(async (_req, res) => {
  res.json({ success: true, data: await adminService.listAcademicYears() });
});
const listSemesters = asyncHandler(async (_req, res) => {
  res.json({ success: true, data: await adminService.listSemesters() });
});
const createUser = asyncHandler(async (req, res) => {
  res.status(201).json({ success: true, data: await adminService.createUser(req.body) });
});
const updateUser = asyncHandler(async (req, res) => {
  res.json({ success: true, data: await adminService.updateUser(req.params.id, req.body) });
});
const listUsers = asyncHandler(async (_req, res) => {
  res.json({ success: true, data: await adminService.listUsers() });
});
const assignManager = asyncHandler(async (req, res) => {
  const data = await adminService.assignManagerToDepartment(req.params.departmentId, req.body.manager_id);
  res.json({ success: true, data });
});
const createGroup = asyncHandler(async (req, res) => {
  res.status(201).json({ success: true, data: await adminService.createGroup(req.body) });
});
const listGroups = asyncHandler(async (_req, res) => {
  res.json({ success: true, data: await adminService.listGroups() });
});
const listStudents = asyncHandler(async (_req, res) => {
  res.json({ success: true, data: await adminService.listStudents() });
});

module.exports = {
  createDepartment,
  listDepartments,
  createAcademicYear,
  createSemester,
  listAcademicYears,
  listSemesters,
  createUser,
  updateUser,
  listUsers,
  assignManager,
  createGroup,
  listGroups,
  listStudents,
};
