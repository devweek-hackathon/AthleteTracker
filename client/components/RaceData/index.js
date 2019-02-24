import React, { Fragment } from 'react';
import { Grid, Header, Table } from 'semantic-ui-react';
import StopWatch from '../StopWatch';

class RaceData extends React.Component {

  render() {
   const  { raceName, totalRacers, checkpointData } = this.props;
  console.log("Checkpoint data from RaceData", checkpointData)
  return (
    <Grid centered stackable>
      <Grid.Row>
        <Header>{raceName}</Header>
      </Grid.Row>
      <Grid.Row columns={2}>
        <Grid.Column verticalAlign="middle">
          <StopWatch />
        </Grid.Column>
        <Grid.Column>
          <Grid.Row>
            <p>Total Racers: {totalRacers}</p>
          </Grid.Row>
            <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Check Point</Table.HeaderCell>
                <Table.HeaderCell>Racers Passed</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {
                checkpointData.map((checkPoint, index) => {
                  console.log("Checkpoint", checkPoint)
                  return (
                    <Table.Row key={index}>
                      <Table.Cell>{checkPoint.raceCheckpoint.id}</Table.Cell>
                      <Table.Cell>{checkPoint.racers.length}</Table.Cell>
                    </Table.Row>
                  )
                })
              }
          </Table.Body>
            </Table>
          <Grid.Row>
          </Grid.Row>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}
}

export default RaceData;