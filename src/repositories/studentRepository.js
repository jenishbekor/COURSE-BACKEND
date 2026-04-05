const { Student, User, Group, Curriculum } = require("../models");

const create = (payload) => Student.create(payload);
const findByUserId = (userId) =>
  Student.findByPk(userId, {
    include: [
      { model: User, as: "user", attributes: { exclude: ["password"] } },
      { model: Group, as: "group", include: [{ model: Curriculum, as: "curriculum" }] },
    ],
  });
const findAll = () =>
  Student.findAll({
    include: [
      { model: User, as: "user", attributes: { exclude: ["password"] } },
      { model: Group, as: "group" },
    ],
  });

module.exports = { create, findByUserId, findAll };
