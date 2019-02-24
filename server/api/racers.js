const router = require('express').Router()
const {Racer, CheckIn} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const racers = await Racer.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'firstName', 'lastName', 'email', 'feePaid', 'waiver']
    })
    res.json(racers)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {email} = req.body
    const newRacer = await Racer.create({email})
    res.json(newRacer)
  } catch (error) {
    next(error)
  }
})

router.get('/:racerId', async (req, res, next) => {
  try {
    const racer = await Racer.findById(Number(req.params.racerId))
    res.json(racer)
  } catch (error) {
    next(error)
  }
})

router.get('/:racerId/checkIns', async (req, res, next) => {
  try {
    console.log('hi')
  } catch (error) {
    next(error)
  }
})
