const router = require('express').Router()
const {Race, RaceCheckpoint, CheckIn} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const races = await Race.findAll()
    res.json(races)
  } catch (error) {
    next(error)
  }
})

router.get('/:raceId', async (req, res, next) => {
  try {
    const race = await Race.findById(Number(req.params.raceId))
    res.json(race)
  } catch (error) {
    next(error)
  }
})

router.get('/:raceId/checkpoints', async (req, res, next) => {
  try {
    const raceCheckpoints = await RaceCheckpoint.findAll({
      where: {raceId: req.params.raceId}
    })

    const checkpointData = await Promise.all(
      raceCheckpoints.map(async raceCheckpoint => {
        const checkedInRacers = await CheckIn.findAll({
          where: {
            raceId: req.params.raceId,
            raceCheckpointId: raceCheckpoint.id
          }
        })
        return {raceCheckpoint, racers: checkedInRacers}
      })
    )

    res.json(checkpointData)
  } catch (error) {
    next(error)
  }
})

router.get(
  '/:raceId/checkpoints/:checkpointId/racers',
  async (req, res, next) => {
    try {
      const checkedInRacers = await CheckIn.findAll({
        where: {
          raceId: req.params.raceId,
          raceCheckpointId: req.params.checkpointId
        }
      })
      res.json(checkedInRacers)
    } catch (error) {
      next(error)
    }
  }
)

// 37.827027, -122.479436
// 37.837369, -122.482944
// 37.839937, -122.479099
// 37.861829, -122.491516
// 37.871523, -122.504700
// 37.876538, -122.517390
// 37.891997, -122.528644
// 37.894328, -122.533568
// 37.937749, -122.535564
// 37.967611, -122.560079
// 37.978666, -122.565198
// 37.985340, -122.583020
// 37.973830, -122.612598
// 37.964382, -122.627010
// 37.944950, -122.633341
// 37.937077, -122.638413
// 37.937953, -122.639042
// 37.938769, -122.638326
// 37.956375, -122.630136
// 37.997718, -122.599717
// 38.010342, -122.617633
// 38.015000, -122.651395
// 38.014396, -122.697006
// 38.025456, -122.735693
// 38.040915, -122.745136
// 38.048198, -122.753208
// 38.046827, -122.772453
// 38.043092, -122.797087
// 38.054876, -122.807147
// 38.061925, -122.817206
// 38.068052, -122.804594
// 38.068426, -122.805030
// 38.069861, -122.807368
// 38.073044, -122.800790
