import React from 'react';
import axios from 'axios';
// import pdf from '../../../public/'
// import image from './image.png';

class RacerProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      racer: {},
    }
  }
  
  componentDidMount() {
    this.getRacer();
  }

  getRacer = async () => {
    const { id } = this.props.match.params
    const racer = await axios.get(`/api/racers/${id}`)
    this.setState({racer: {...racer.data}})
  }
  render() {
    const { racer } = this.state;
  if (racer) {
    return (
      <div>
        <p>{racer.firstName}</p>
        <p>{racer.lastName}</p>
        <img src='http://localhost:8080/image.png' />
        {/* <iframe src={pdf} width="auto" height="auto" /> */}

      </div>
    )
  }
  return (
    <div>
      Loading
    </div>
  )
  }
}

export default RacerProfile;
