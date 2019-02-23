import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Section, Title } from '../../styledComponents';
import { Racers } from '../../components';
import { racers } from '../../tempData';

/**
 * COMPONENT
 */
export const AdminDash = () => {
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