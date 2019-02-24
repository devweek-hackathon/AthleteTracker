const axios = require('axios')
const {RaceCheckpoint, CheckIn} = require('../db/models')
const ttCredentials = require('../../secrets.js')
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

const getGeofenceStatus = async racerCoords => {
  const {data} = await axios.get(
    `https://api.tomtom.com/geofencing/1/report/${
      ttCredentials.geofencingProjectId
    }/?point=${racerCoords.lng}%2C${racerCoords.lat}&range=100&&key=${
      ttCredentials.apiKey
    }`
  )
  return data.inside.features
}

router.post('/racerUpdate', async (req, res, next) => {
  try {
    const {lat, lng, racerId, raceId, timeEntered} = req.body
    const racerCoords = {lat, lng}
    const matchingGeofence = await getGeofenceStatus(racerCoords)
    if (matchingGeofence.length) {
      //we shouldn't have overlapping geofences, so just take the first one
      const geofenceId = matchingGeofence[0].properties.id
      const raceCheckpoint = await RaceCheckpoint.findById(geofenceId)
      if (raceCheckpoint) {
        const newCheckIn = await CheckIn.create({
          raceId,
          racerId,
          raceCheckpointId: raceCheckpoint.id,
          timeEntered
        })
        res.json(newCheckIn)
      } else {
        res.send(`Racer ${racerId} is lost`)
      }
    } else {
      res.send(`Racer ${racerId} is not in a geofenced area`)
    }
  } catch (error) {
    next(error)
  }
})
