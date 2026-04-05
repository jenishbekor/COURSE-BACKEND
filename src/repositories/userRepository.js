const { User, Role, Student, Group } = require("../models");

const create = (payload) => User.create(payload);
const findByEmail = (email) =>
  User.findOne({ where: { email }, include: [{ model: Role, as: "role" }] });
const findById = (id) =>
  User.findByPk(id, {
    attributes: { exclude: ["password"] },
    include: [
      { model: Role, as: "role" },
      { model: Student, as: "studentProfile", include: [{ model: Group, as: "group" }] },
    ],
  });
const findAll = () =>
  User.findAll({
    attributes: { exclude: ["password"] },
    include: [{ model: Role, as: "role" }],
  });
const updateById = async (id, payload) => {
  await User.update(payload, { where: { id } });
  return findById(id);
};

module.exports = { create, findByEmail, findById, findAll, updateById };
