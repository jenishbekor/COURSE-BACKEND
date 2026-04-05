const { Role } = require("../models");
const userRepository = require("../repositories/userRepository");
const studentRepository = require("../repositories/studentRepository");
const ApiError = require("../utils/apiError");
const { comparePassword, hashPassword } = require("../utils/password");
const { generateToken } = require("../utils/token");

const login = async ({ email, password }) => {
  const user = await userRepository.findByEmail(email);
  if (!user || !(await comparePassword(password, user.password))) {
    throw new ApiError(401, "Invalid email or password");
  }

  return {
    token: generateToken({ id: user.id, role: user.role.role_name }),
    user: {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role.role_name,
    },
  };
};

const registerStudent = async (payload) => {
  const studentRole = await Role.findOne({ where: { role_name: "Student" } });
  if (!studentRole) {
    throw new ApiError(500, "Student role not configured");
  }

  const exists = await userRepository.findByEmail(payload.email);
  if (exists) {
    throw new ApiError(409, "User with this email already exists");
  }

  const user = await userRepository.create({
    first_name: payload.first_name,
    last_name: payload.last_name,
    email: payload.email,
    password: await hashPassword(payload.password),
    role_id: studentRole.id,
  });

  await studentRepository.create({
    user_id: user.id,
    group_id: payload.group_id,
    student_id_number: payload.student_id_number,
  });

  return userRepository.findById(user.id);
};

module.exports = { login, registerStudent };
