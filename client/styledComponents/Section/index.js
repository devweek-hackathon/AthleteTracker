import styled from 'styled-components';
import { colors, media } from '../../styles';

const Section = styled.div`
  margin: 0 auto;
  background: ${props => (props.dark ? colors.lightGrey : colors.white)};
  max-width: ${props => (props.inner ? '768px' : undefined)};
  padding-top: ${props => (props.noPadTop || props.noPad ? '0' : '60px')};
  padding-bottom: ${props => (props.noPadBottom || props.noPad ? '0' : '60px')};
  ${media.tablet`
    padding-top: ${props => (props.noPadTop || props.noPad ? '0' : '80px')};
    padding-bottom: ${props => props.noPadBottom || props.noPad ? '0' : '80px'};
  `}
  ${media.desktop`
    max-width: unset;
    padding-top: ${props => (props.noPadTop || props.noPad ? '0' : '120px')};
    padding-bottom: ${props => props.noPadBottom || props.noPad ? '0' : '120px'};
  `}
`;

export default Section;
