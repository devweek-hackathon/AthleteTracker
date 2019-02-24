const Sequelize = require('sequelize')
const db = require('../db')

const Racer = db.define('racer', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  waiver: {
    type: Sequelize.JSON,
    defaultValue: {signed: false, docUrl: ''}
  },
  feePaid: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  tomtomDeviceId: {
    type: Sequelize.STRING
  }
})

module.exports = Racer
