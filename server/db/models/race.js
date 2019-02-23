const Sequelize = require('sequelize')
const db = require('../db')

const Race = db.define('race', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  date: {
    type: Sequelize.DATE
  }
})

module.exports = Race
