const User = require('./user')
const Racer = require('./racer')
const Checkpoint = require('./checkpoint')
const CheckIn = require('./checkIn')
const Race = require('./race')
const RaceCheckpoint = require('./raceCheckpoint')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
CheckIn.belongsTo(Race)
Race.hasMany(CheckIn)

Race.belongsToMany(Checkpoint, {through: RaceCheckpoint})
Checkpoint.belongsToMany(Race, {through: RaceCheckpoint})

Racer.belongsToMany(RaceCheckpoint, {through: CheckIn})
RaceCheckpoint.belongsToMany(Racer, {through: CheckIn})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Racer,
  Checkpoint,
  RaceCheckpoint,
  CheckIn,
  Race
}
