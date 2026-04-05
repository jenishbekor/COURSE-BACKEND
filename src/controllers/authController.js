const asyncHandler = require("../utils/asyncHandler");
const authService = require("../services/authService");

const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);
  res.json({ success: true, data: result });
});

const registerStudent = asyncHandler(async (req, res) => {
  const result = await authService.registerStudent(req.body);
  res.status(201).json({ success: true, data: result });
});

module.exports = { login, registerStudent };
