const User = require('./user')
const Racer = require('./racer')
const Checkpoint = require('./checkpoint')
const CheckIn = require('./checkIn')
const Race = require('./race')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
CheckIn.belongsTo(Race)
Race.hasMany(CheckIn)

Racer.belongsToMany(Checkpoint, {through: CheckIn})
Checkpoint.belongsToMany(Racer, {through: CheckIn})

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
  CheckIn,
  Race
}
