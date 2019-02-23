import styled from 'styled-components';

const RacerTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  tr {
    width: 100%; 
    display: flex;
    justify-content: space-around;
  }

  table, th, td {
    border: 1px solid black;
  }
`;

const RacerHead = styled.thead`
  width: 100%;
  th {
    width: 33%;
    text-align: center;
  }
`;

const RacerBody = styled.tbody`
  width: 100%;

  td {
    width: 33%;
  }
`;

export {
  RacerTable,
  RacerHead,
  RacerBody,
}


