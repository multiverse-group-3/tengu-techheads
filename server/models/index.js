const {Sequelize} = require('sequelize')
const {sequelize} = require('../db')

const Person = sequelize.define("people", {
  name: Sequelize.STRING,
  company: Sequelize.STRING,
  role: Sequelize.STRING,
  image: Sequelize.STRING,
  quote: Sequelize.STRING,
  pokemon: Sequelize.STRING,
  fact: Sequelize.STRING
});

module.exports = {
  db: sequelize,
  Person,
};
