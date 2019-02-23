const router = require('express').Router()
const {Racer, RaceStatus, Checkpoint} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const checkpoints = await Checkpoint.findAll({})
    res.json(checkpoints)
  } catch (err) {
    next(err)
  }
})

router.get('/:checkpointId', async (req, res, next) => {
  try {
    const racer = await Racer.findById(Number(req.params.racerId))
    res.json(racer)
  } catch (error) {
    next(error)
  }
})
