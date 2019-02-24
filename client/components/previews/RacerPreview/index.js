import React from 'react';
import PropTypes from 'prop-types'
import { RacerContainer } from './styles';
import { withRouter } from 'react-router-dom';

const RacerPreview = withRouter(({ id, firstName, lastName, paid, waiver, history}) => (
  <RacerContainer onClick={() => history.push(`/racers/${id}`)}>
    <td>{firstName} {lastName}</td>
    <td>{paid ? "Paid" : "Not Paid"}</td>
    <td>{waiver.signed ? "Waiver Signed" : "No Waiver"}</td>
  </RacerContainer>
))

export default RacerPreview;

RacerPreview.propTypes = {
  id: PropTypes.number.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  paid: PropTypes.bool.isRequired,
  waiver: PropTypes.object.isRequired,
};

