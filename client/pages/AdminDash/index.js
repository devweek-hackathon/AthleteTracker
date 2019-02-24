import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Section, Title} from '../../styledComponents'
import {Racers} from '../../components'
import axios from 'axios'

/**
 * COMPONENT
 */
class AdminDash extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      racers: []
    }
  }

  componentDidMount() {
    this.getRacers()
    this.getSigner()
  }

  getRacers = async () => {
    const res = await axios.get('/api/racers')
    console.log(res.data)
    this.setState({racers: [...res.data]})
  }

  getSigner = async () => {
    const res = await axios.get('/api/docusign')
    console.log('docusign: ', res.data.signers);
    let result = res.data.signers;
    console.log('result: ', result);
    let newSigner = []
    for (let i = 0; i < result.length; i++) {
      let currentSigner = result[i] 
      newSigner.push({
        id: i + 1,
        firstName: currentSigner['name'].split(' ')[0],
        lastName: currentSigner['name'].split(' ')[1],
        feePaid: currentSigner['status'],
        email: currentSigner['email'],
        waiver: {
          docUrl: '',
          signed: currentSigner['status'],
        }
      })
    }
    console.log('newSigner: ', newSigner);
    this.setState({racers: [...newSigner]})
  }

  render() {
    const {racers} = this.state
    if (racers) {
      console.log(racers)
      return (
        <Fragment>
          <Section>
            <Title>Admin Dash</Title>
          </Section>
          <Section noPad>
            <Racers racers={racers} />
          </Section>
        </Fragment>
      )
    }
    return <div>Loading</div>
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(AdminDash)

/**
 * PROP TYPES
 */
AdminDash.propTypes = {
  email: PropTypes.string
}
