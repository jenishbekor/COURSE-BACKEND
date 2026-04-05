const { Role, DeptManager } = require("../models");
const departmentRepository = require("../repositories/departmentRepository");
const academicRepository = require("../repositories/academicRepository");
const userRepository = require("../repositories/userRepository");
const groupRepository = require("../repositories/groupRepository");
const studentRepository = require("../repositories/studentRepository");
const ApiError = require("../utils/apiError");
const { hashPassword } = require("../utils/password");
const pick = require("../utils/pick");

const createDepartment = (payload) => departmentRepository.create(payload);
const listDepartments = () => departmentRepository.findAll();
const updateDepartment = async (id, payload) => {
  const department = await departmentRepository.findById(id);
  if (!department) {
    throw new ApiError(404, "Department not found");
  }

  const updates = pick(payload, ["name", "description"]);
  return departmentRepository.updateById(id, updates);
};

const createAcademicYear = (payload) => academicRepository.createYear(payload);
const createSemester = (payload) => academicRepository.createSemester(payload);
const listAcademicYears = () => academicRepository.listYears();
const listSemesters = () => academicRepository.listSemesters();

const createUser = async (payload) => {
  const role = await Role.findOne({ where: { role_name: payload.role_name } });
  if (!role) {
    throw new ApiError(400, "Invalid role name");
  }

  const existing = await userRepository.findByEmail(payload.email);
  if (existing) {
    throw new ApiError(409, "User with this email already exists");
  }

  const user = await userRepository.create({
    first_name: payload.first_name,
    last_name: payload.last_name,
    email: payload.email,
    password: await hashPassword(payload.password),
    role_id: role.id,
  });

  return userRepository.findById(user.id);
};

const updateUser = async (id, payload) => {
  const updates = pick(payload, ["first_name", "last_name", "email"]);
  if (payload.password) {
    updates.password = await hashPassword(payload.password);
  }
  return userRepository.updateById(id, updates);
};

const listUsers = () => userRepository.findAll();

const assignManagerToDepartment = async (departmentId, managerId) => {
  const department = await departmentRepository.findById(departmentId);
  const manager = await userRepository.findById(managerId);

  if (!department || !manager) {
    throw new ApiError(404, "Department or manager not found");
  }

  if (manager.role.role_name !== "Manager") {
    throw new ApiError(400, "Selected user is not a manager");
  }

  await DeptManager.findOrCreate({
    where: { department_id: departmentId, manager_id: managerId },
    defaults: { department_id: departmentId, manager_id: managerId },
  });

  return departmentRepository.findById(departmentId);
};

const createGroup = (payload) => groupRepository.create(payload);
const listGroups = () => groupRepository.findAll();
const listStudents = () => studentRepository.findAll();

module.exports = {
  createDepartment,
  listDepartments,
  updateDepartment,
  createAcademicYear,
  createSemester,
  listAcademicYears,
  listSemesters,
  createUser,
  updateUser,
  listUsers,
  assignManagerToDepartment,
  createGroup,
  listGroups,
  listStudents,
};
