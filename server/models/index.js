const {Sequelize} = require('sequelize')
const {sequelize} = require('../db')

const Person = sequelize.define("people", {
  name: Sequelize.STRING,
  company: Sequelize.STRING,
});

module.exports = {
  db: sequelize,
  Person,
};
