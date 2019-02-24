import React from 'react';
import { RacerPreview } from '../previews';
import { SubTitle } from '../../styledComponents';
import { RacerTable, RacerHead, RacerBody } from './styles';

const Racers = ({ racers }) => {
  return (
    <div>
      <SubTitle>Registered Racers</SubTitle>
      <RacerTable>
        <RacerHead>
          <tr>
            <th>Name</th>
            <th>Paid</th>
            <th>Signed Waiver</th>
          </tr>
        </RacerHead>
        <RacerBody>
        {
          racers.map(racer => (
            <RacerPreview 
              key={racer.id}
              {...racer}
            /> 
          ))
        }
        </RacerBody>
      </RacerTable>
    </div>
  )
}

export default Racers;
