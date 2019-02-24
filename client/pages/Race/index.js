import React, {Component, Fragment} from 'react'
import {Section} from '../../styledComponents'
import {RaceData, Map} from '../../components'
import axios from 'axios'
import {Grid, Header, Button} from 'semantic-ui-react'
import {raceData} from './raceData'
import StopWatch from '../../components/StopWatch'

class Race extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checkPointData: [],
      totalRacers: null,
      title: '',
      raceStarted: false,
      raceUpdates: 0,
      newPoint: {}
    }
  }

  async componentDidMount() {
    await this.getInitialRaceData()
  }

  componentDidUpdate(prevProps, prevState) {
    const {raceStarted} = this.state
    if (prevProps.race.id !== this.props.race.id) {
      this.getInitialRaceData()
    }

    // if (raceStarted && prevState.raceStarted !== raceStarted) {
    //   this.startUpdateInterval()
    // }
  }

  getInitialRaceData = async () => {
    const {race} = this.props
    console.log('pr', this.props)
    const raceName = await axios.get(`/api/races/${race.id}`)
    const racerRes = await axios.get('/api/racers')
    const res = await axios.get(`/api/races/${race.id}/checkpoints`)

    const initialCheckpointData = res.data.map(checkpoint => {
      checkpoint.racers = []
      return checkpoint
    })

    this.setState({
      checkPointData: initialCheckpointData,
      totalRacers: racerRes.data.length,
      title: raceName.data.name
    })
  }

  // startUpdateInterval = () => {
  //   this.interval = setInterval(() => this.updateRaceData(), 1000)
  // }

  updateRaceData = async () => {
    const {race} = this.props
    const res = await axios.get(`/api/races/${race.id}/checkpoints`)
    this.setState(prevState => ({
      checkPointData: res.data,
      raceUpdates: prevState.raceUpdates + 1
    }))
  }

  startRace() {
    const {race} = this.props
    raceData.map(gpsPing => {
      const {lat, lng, racerId, timeEntered} = gpsPing
      const datetimeEntered = new Date(
        new Date().getTime() + timeEntered * 60000
      )
      const raceUpdateData = {
        lat,
        lng,
        racerId,
        raceId: race.id,
        timeEntered: datetimeEntered
      }
      setTimeout(async () => {
        await axios.post('/api/tomtom/racerUpdate', raceUpdateData)
        await this.updateRaceData()
        this.setState({newPoint: {lat, lng, racerId, radius: 10}})
        await axios.put(`/api/racers/${racerId}`, {currentLocation: {lat, lng}})
      }, gpsPing.timeEntered)
    })
    this.setState({
      raceStarted: true
    })
  }

  stopRace() {
    console.log('Called Clear Interval')
    clearInterval(this.interval)
    this.setState({
      raceStarted: false,
      raceUpdates: 0
    })
  }

  resetRace() {}

  render() {
    const {
      totalRacers,
      checkPointData,
      title,
      raceStarted,
      raceUpdates,
      newPoint
    } = this.state
    return (
      <Fragment>
        <Section>
          <Grid centered stackable>
            <Grid.Row>
              <Header>{title}</Header>
            </Grid.Row>
            <Grid.Row>
              {raceStarted ? (
                <Button onClick={() => this.stopRace()}>Stop Race</Button>
              ) : (
                <Button onClick={() => this.startRace()}>Start Race</Button>
              )}
            </Grid.Row>
            {/* {raceStarted && <Grid.Row>
              <Header>{raceUpdates}</Header>
              <Button onClick={() => this.updateRaceData()}>Update</Button>
            </Grid.Row>} */}
            <Grid.Row centered>
              <Grid.Column>
                <StopWatch />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <RaceData
                  totalRacers={totalRacers}
                  checkpointData={checkPointData}
                />
              </Grid.Column>
              <Grid.Column>
                <Map
                  app_id="d05D2l6CCqaPWnkWjYMJ"
                  app_code="md9XSoYBLPDA-aBPmvA4qg"
                  lat="37.812223"
                  lng="-122.48784"
                  zoom="11"
                  theme="normal.day"
                  checkpoints={checkPointData}
                  raceStarted={raceStarted}
                  newPoint={newPoint}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Section>
      </Fragment>
    )
  }
}

export default Race
