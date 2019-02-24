const axios = require('axios')
const router = require('express').Router()

module.exports = router

const getTomTomProj = async () => {
  const {data} = await axios.get(
    'https://api.tomtom.com/geofencing/1/projects/4a12f120-214c-4933-b461-d028cc646ec4?&key=iqShTYBkTokAoZWkpg738rSzKBWMPmAz&defaultObjects=true'
  )
  return data
}

router.get('/', async (req, res, next) => {
  try {
    const ttp = await getTomTomProj()
    res.json(ttp)
  } catch (error) {
    next(error)
  }
})
