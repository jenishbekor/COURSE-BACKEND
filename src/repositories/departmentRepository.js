const { Department, User, Curriculum, Group } = require("../models");

const create = (payload) => Department.create(payload);
const findAll = () =>
  Department.findAll({
    include: [
      { model: User, as: "managers", through: { attributes: [] } },
      { model: Curriculum, as: "curriculums" },
      { model: Group, as: "groups" },
    ],
  });
const findById = (id) =>
  Department.findByPk(id, {
    include: [{ model: User, as: "managers", through: { attributes: [] } }],
  });
const updateById = async (id, payload) => {
  await Department.update(payload, { where: { id } });
  return findById(id);
};

module.exports = { create, findAll, findById, updateById };
