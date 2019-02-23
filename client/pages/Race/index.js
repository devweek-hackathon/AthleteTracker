import React, { Component, Fragment } from 'react';
import { Section, Title } from '../../styledComponents';

class Race extends Component {
  constructor(props) {
    super(props);
    this.state = {
      raceStarted: false,
    };
    this.startRace = this.startRace.bind(this);
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
          <button 
            type="button"
            onClick={this.startRace}
          >
          {raceStarted ? "End Race" : "Start Race"}
          </button>
        </Section>
      </Fragment>
    )
  }
};

export default Race;
