import React from 'react';
import axios from 'axios';

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
