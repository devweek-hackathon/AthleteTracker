const Sequelize = require('sequelize')
const db = require('../db')

const Checkpoint = db.define('checkpoint', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  lat: {
    type: Sequelize.FLOAT
  },
  lng: {
    type: Sequelize.FLOAT
  },
  radius: {
    type: Sequelize.INTEGER
  }
})

module.exports = Checkpoint
