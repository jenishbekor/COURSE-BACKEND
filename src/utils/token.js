const jwt = require("jsonwebtoken");

const generateToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET || "change-me", { expiresIn: "7d" });

module.exports = { generateToken };
