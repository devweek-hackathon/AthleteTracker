import React, { Component, Fragment } from 'react';
import { Section, Title } from '../../styledComponents';
import { StopWatch, RaceData } from '../../components';

class Race extends Component {
  constructor(props) {
    super(props);
    this.state = {
      raceStarted: false,
      checkPoints: [],
    };
    this.startRace = this.startRace.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { raceStarted, checkPoints } = this.state
    if (raceStarted) {
      
    }
  }

  startRace() {
    this.setState(prevState => (
      {raceStarted: !prevState.raceStarted}
    ))
  }
  
  render() {
    const { raceStarted } = this.state;
    return (
      <Fragment>
        <Section>
          <Title>{ raceStarted ? "Current Race" : "Race Details" }</Title>
        </Section>
        <Section>
          {raceStarted ? 
            <StopWatch />
            :
          <button 
          type="button"
          onClick={this.startRace}
          >
            Start Race
          </button>
          }
        </Section>
        <Section>
          <RaceData />
        </Section>
      </Fragment>
    )
  }
};

export default Race;
