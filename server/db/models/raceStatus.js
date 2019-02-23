const Sequelize = require('sequelize')
const db = require('../db')

const RaceStatus = db.define('raceStatus', {
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

module.exports = RaceStatus
