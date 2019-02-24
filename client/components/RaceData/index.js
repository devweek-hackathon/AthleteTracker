import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import {Grid, Table} from 'semantic-ui-react'

class RaceData extends React.Component {
  render() {
    const {totalRacers, checkpointData} = this.props
    console.log('Checkpoint data from RaceData', checkpointData)
    return (
      <Grid.Column>
        <Grid.Row>
          <p>Total Racers: {totalRacers}</p>
        </Grid.Row>
        <Table unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Check Point</Table.HeaderCell>
              <Table.HeaderCell>Check Name</Table.HeaderCell>
              <Table.HeaderCell>Racers Passed</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {checkpointData.map((checkPoint, index) => {
              console.log('Checkpoint', checkPoint)
              return (
                <Table.Row key={index}>
                  <Table.Cell>{checkPoint.raceCheckpoint.id}</Table.Cell>
                  <Table.Cell>{checkPoint.checkpointData.name}</Table.Cell>
                  <Table.Cell>{checkPoint.racers.length}</Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
      </Grid.Column>
    )
  }
}

export default RaceData
