const Sequelize = require("sequelize");
const db = require("../database");

module.exports = db.define("artist", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  bio: {
    type: Sequelize.TEXT
  },
  website: {
    type: Sequelize.TEXT
  },
  owner: {
    type: Sequelize.INTEGER
  }
});
