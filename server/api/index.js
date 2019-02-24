const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/racers', require('./racers'))
router.use('/races', require('./races'))
router.use('/tomtom', require('./tomtom'))
router.use('/docusign', require('./docusign'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
