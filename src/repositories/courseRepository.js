const { Course, Department } = require("../models");

const create = (payload) => Course.create(payload);
const findAll = () => Course.findAll({ include: [{ model: Department, as: "department" }] });
const findById = (id) => Course.findByPk(id, { include: [{ model: Department, as: "department" }] });
const findByCode = (course_code) => Course.findOne({ where: { course_code } });

module.exports = { create, findAll, findById, findByCode };
