const { Group, Department, Curriculum, Student, User } = require("../models");

const create = (payload) => Group.create(payload);
const findAll = () =>
  Group.findAll({
    include: [
      { model: Department, as: "department" },
      { model: Curriculum, as: "curriculum" },
      {
        model: Student,
        as: "students",
        include: [{ model: User, as: "user", attributes: { exclude: ["password"] } }],
      },
    ],
  });
const findById = (id) =>
  Group.findByPk(id, {
    include: [{ model: Curriculum, as: "curriculum" }],
  });

module.exports = { create, findAll, findById };
