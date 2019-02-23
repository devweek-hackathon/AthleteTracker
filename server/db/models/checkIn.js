const Sequelize = require('sequelize')
const db = require('../db')

const CheckIn = db.define('checkIn', {
  userId: {
    type: Sequelize.INTEGER
  },
  checkpointId: {
    type: Sequelize.INTEGER
  },
  timeEntered: {
    type: Sequelize.DATE
  }
})

module.exports = CheckIn
