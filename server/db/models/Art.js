const Sequelize = require("sequelize");
const db = require("../database");

module.exports = db.define("art", {
  title: {
    type: Sequelize.STRING,
    defaultValue: "Untitled"
  },
  image: {
    type: Sequelize.STRING
  },
  dimensions: {
    type: Sequelize.STRING
  },
  medium: {
    type: Sequelize.STRING
  },
  yearMade: {
    type: Sequelize.INTEGER
  },
  description: {
    type: Sequelize.TEXT
  },
  artistName: {
    type: Sequelize.STRING,
    allowNull: false
  },

})
