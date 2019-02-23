const Sequelize = require('sequelize')
const db = require('../db')

const Checkpoint = db.define('checkpoint', {
  // name: {
  //   type: Sequelize.STRING,
  //   unique: true,
  //   allowNull: false
  // },
  tomtomId: {
    type: Sequelize.STRING
  }
})

module.exports = Checkpoint
