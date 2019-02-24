const router = require('express').Router()
const {Race, RaceCheckpoint, Checkpoint, CheckIn} = require('../db/models')
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
        const cd = await Checkpoint.findOne({
          where: {id: raceCheckpoint.checkpointId}
        })
        const checkedInRacers = await CheckIn.findAll({
          where: {
            raceId: req.params.raceId,
            raceCheckpointId: raceCheckpoint.id
          }
        })
        return {raceCheckpoint, checkpointData: cd, racers: checkedInRacers}
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
