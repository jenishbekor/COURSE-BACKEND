const jwt = require("jsonwebtoken");
const { User, Role, Student } = require("../models");
const ApiError = require("../utils/apiError");

module.exports = async (req, _res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Authorization token is required");
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "change-me");

    const user = await User.findByPk(decoded.id, {
      include: [
        { model: Role, as: "role" },
        { model: Student, as: "studentProfile" },
      ],
    });

    if (!user) {
      throw new ApiError(401, "Invalid token");
    }

    req.user = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role.role_name,
      studentProfile: user.studentProfile,
    };
    next();
  } catch (error) {
    next(error.statusCode ? error : new ApiError(401, "Authentication failed"));
  }
};
