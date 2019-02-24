import React, { Component, Fragment } from 'react';
import { Section, Title } from '../../styledComponents';
import { RaceData } from '../../components';
import axios from 'axios';

class Race extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkPointData: [],
      totalRacers: null,
      title: '',
    };
  }

  componentDidMount() {
    this.getInitialRaceData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.race.id !== this.props.race.id){
      this.getInitialRaceData()
    }
  }

  getInitialRaceData = async () => {
    const { race } = this.props;
    const raceName = await axios.get(`/api/races/${race.id}`)
    const racerRes = await axios.get('/api/racers')
    const res = await axios.get(`/api/races/${race.id}/checkpoints`)

    this.setState({ 
      checkPointData: res.data,
      totalRacers: racerRes.data.length,
      title: raceName.data.name,
    })
  }

  render() {
    const { totalRacers, checkPointData, title } = this.state;
    console.log("Checkpoint Data", checkPointData)
    return (
      <Fragment>
        <Section>
          <RaceData
            totalRacers={totalRacers}
            checkpointData={checkPointData}
            raceName={title}
          />
        </Section>
      </Fragment>
    )
  }
};

export default Race;
