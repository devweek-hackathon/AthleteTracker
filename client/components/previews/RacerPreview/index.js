import React from 'react';
import PropTypes from 'prop-types'
import { RacerContainer } from './styles';

const RacerPreview = ({ firstName, lastName, paid, waiver}) => (
  <RacerContainer>
    <td>{firstName} {lastName}</td>
    <td>{paid ? "Paid" : "Not Paid"}</td>
    <td>{waiver.signed ? "Waiver Signed" : "No Waiver"}</td>
  </RacerContainer>
);

export default RacerPreview;

RacerPreview.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  paid: PropTypes.bool.isRequired,
  waiver: PropTypes.object.isRequired,
};

