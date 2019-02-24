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
        <iframe src="http://localhost:8080/3A0A4696-EF27-44A3-B237-AD025BD0FCB7.pdf" width="800px" height="2100px" />

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
