const ApiError = require("../utils/apiError");

module.exports = (...allowedRoles) => (req, _res, next) => {
  if (!req.user || !allowedRoles.includes(req.user.role)) {
    return next(new ApiError(403, "Access denied"));
  }
  return next();
};
