const Sequelize = require('sequelize')
const db = require('../db')

const RaceCheckpoint = db.define('raceCheckpoint', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  index: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = RaceCheckpoint
