const router = require('express').Router()
const {Racer, RaceStatus} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await Racer.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
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
