// import Axios from 'axios';

const axios = require('axios');

const ttCredentials = require('../secrets.js')

// Stubbed out ride data
// make api call for each lat/long
// tomtom returns in fence for each location

// imagine we take the most recent batch of rider data
  // three batches, start middle finish

//  37.808790, -122.475836 Presidio
// -122.806789 38.068793 Point Reyes
// 37.986981, -122.589129  coffee shop in Fairfax - rider dropped in and dropped out
// 38.030063, -122.740922 on route
// 38.045072, -122.778323 on route


const sample1 = [
  {
    athlete: '1',
    lat: '37.808790',
    lng: '-122.475836',
    time: 'start'
  },
  {
    athlete: '2',
    lat: '37.808790',
    lng: '-122.475836',
    time: 'start'
  },
  {
    athlete: '3',
    lat: '37.808790',
    lng: '-122.475836',
    time: 'start'
  },
  {
    athlete: '4',
    lat: '37.808790',
    lng: '-122.475836',
    time: 'start'
  },
  {
    athlete: '5',
    lat: '37.808790',
    lng: '-122.475836',
    time: 'start'
  }
];
const sample2 = [
  {
    athlete: '1',
    lat: '37.986981',
    lng: '122.589129',
    time: 'middle'
  },
  {
    athlete: '2',
    lat: '38.030063',
    lng: '-122.740922',
    time: 'middle'
  },
  {
    athlete: '3',
    lat: '38.045072',
    lng: '-122.778323',
    time: 'middle'
  },
  {
    athlete: '4',
    lat: '38.068793',
    lng: '-122.806789',
    time: 'middle'
  },
  {
    athlete: '5',
    lat: '38.068793',
    lng: '-122.806789',
    time: 'middle'
  }
];
const sample3 = [
  {
    athlete: '1',
    lat: '38.068793',
    lng: '-122.806789',
    time: 'finish'
  },
  {
    athlete: '2',
    lat: '38.068793',
    lng: '-122.806789',
    time: 'finish'
  },
  {
    athlete: '3',
    lat: '38.068793',
    lng: '-122.806789',
    time: 'finish'
  },
  {
    athlete: '4',
    lat: '38.068793',
    lng: '-122.806789',
    time: 'finish'
  },
  {
    athlete: '5',
    lat: '38.068793',
    lng: '-122.806789',
    time: 'finish'
  }
]

const reqData = {
    athlete: 'INEEEDTHIS',
    lat: '38.068793',
    lng: '-122.806789',
    time: 'middle'
}

const allRacers = [];

async function getGeofenceStatus(racer) {
  try {
    const response = await axios.get(`https://api.tomtom.com/geofencing/1/report/${ttCredentials.geofencingProjectId}/?point=${racer.lng}%2C${racer.lat}&range=100&&key=${ttCredentials.apiKey}`);
    allRacers.push({...response.data, ...racer});
    console.log(allRacers)
  } catch (error) {
    console.error(error);
  }
}

const getAllRacers = (racers) => {
  Promise.all(racers.map((racer) => {
    return getGeofenceStatus(racer)
  })).then(console.log(allRacers))

}

console.log(ttCredentials)
// getGeofenceStatus(reqData);
getAllRacers(sample2);
