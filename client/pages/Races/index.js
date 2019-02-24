import React, { Fragment, Component } from 'react';
import axios from 'axios';
import { Dropdown, Grid, Header } from 'semantic-ui-react';
import { Loader, Section } from '../../styledComponents';
import Race from '../Race';

class Races extends Component {
  constructor(props) {
    super(props);
    this.state = {
      races: [],
      selectedRace: {
        id: 1,
      }
    }
  }
  
  componentDidMount() {
    this.getRaces();
  }

  componentDidUpdate

  getRaces = async() => {
    const res = await axios.get('/api/races')
    const raceOptions = res.data.map(race => (
      { 
        key: race.id, 
        value: race.id,
        text: race.name,
      }
    ))
    this.setState({
      races: [...raceOptions]
    })
  }

  handleChange = (e, { value }) => {
    this.setState({ 
      selectedRace: {
        id: value,
      },
    })
  };

  render() {
    const { races, selectedRace } = this.state;
    if (races) {
      console.log(races)
      return (
        <Grid centered>
          <Grid.Row>
            <Header>Races</Header>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column 
              mobile={14}
              tablet={12}
              computer={10}
            >
              <Dropdown
                placeholder='Select a Race' 
                search 
                fluid
                selection
                options={races}
                onChange={this.handleChange}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            { selectedRace && 
              <Race race={selectedRace}/>
            }
          </Grid.Row>
        </Grid>
      )
    }
    return (
      <Fragment>
        <Loader />
      </Fragment>
    )
  }
}

export default Races;