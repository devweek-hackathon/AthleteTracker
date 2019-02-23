const Sequelize = require('sequelize')
const db = require('../db')

const Checkpoint = db.define('checkpoint', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  tomtomID: {
    type: Sequelize.STRING
  },
  orderInRace: {
    type: Sequelize.INTEGER
  }
})

module.exports = Checkpoint
