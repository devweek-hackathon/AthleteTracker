'use strict'

const db = require('../server/db')
const {
  User,
  Race,
  Racer,
  Checkpoint,
  CheckIn,
  RaceCheckpoint
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'}),
    User.create({email: 'dev@dev.com', password: 'password'})
  ])
  console.log(`seeded ${users.length} users`)

  const races = await Promise.all([
    Race.create({name: 'Race1', date: '02/28/2019'}),
    Race.create({name: 'Race2', date: '03/14/2019'})
  ])
  console.log(`seeded ${races.length} races`)

  const checkpoints = await Promise.all([
    Checkpoint.create({tomtomId: '1'}),
    Checkpoint.create({tomtomId: '2'}),
    Checkpoint.create({tomtomId: '3'})
  ])
  console.log(`seeded ${checkpoints.length} checkpoints`)

  const racers = await Promise.all([
    Racer.create({
      email: 'racer1@gmail.com',
      firstName: 'Bob',
      lastName: 'Dole'
    }),
    Racer.create({
      email: 'racer2@gmail.com',
      firstName: 'Maya',
      lastName: 'Gold'
    })
  ])
  console.log(`seeded ${racers.length} racers`)

  const raceCheckpoints = await Promise.all([
    RaceCheckpoint.create({
      raceId: 1,
      checkpointId: 1,
      index: 0
    }),
    RaceCheckpoint.create({
      raceId: 1,
      checkpointId: 2,
      index: 1
    })
  ])
  console.log(`seeded ${raceCheckpoints.length} race checkpoints`)

  // const checkIns = await Promise.all([
  //   CheckIn.create({
  //     raceId: 1,
  //     racerId: 1,
  //     raceCheckpointId: 1,
  //     timeEntered: '02/28/2019 13:35:00'
  //   }),
  //   CheckIn.create({
  //     raceId: 1,
  //     racerId: 1,
  //     raceCheckpointId: 2,
  //     timeEntered: '02/28/2019 14:03:00'
  //   }),
  //   CheckIn.create({
  //     raceId: 1,
  //     racerId: 2,
  //     raceCheckpointId: 1,
  //     timeEntered: '02/28/2019 13:25:00'
  //   })
  // ])
  // console.log(`seeded ${checkIns.length} check-ins`)

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
