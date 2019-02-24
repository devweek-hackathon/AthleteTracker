import React from 'react'

import { Navbar } from './components'
import Routes from './routes'
import {Grid} from 'semantic-ui-react';

const App = () => {
  return (
    <div>
      <Navbar />
      <Grid centered>
        <Grid.Column
          mobile={14}
          tablet={12}
          computer={10}
          largeScreen={10}
        >
          <Routes />
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default App
