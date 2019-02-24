const Sequelize = require('sequelize')
const db = require('../db')

const CheckIn = db.define('checkIn', {
  timeEntered: {
    type: Sequelize.DATE,
    allowNull: false
  }
})

module.exports = CheckIn
