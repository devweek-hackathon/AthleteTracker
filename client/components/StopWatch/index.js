import React from 'react';

const formattedSeconds = (sec) => (
  Math.floor(sec / 60) + ':' + ('0' + sec % 60).slice(-2)
)

const Button = (props) => (
  <button type="button" {...props} className={"btn " + props.className } />
)
  

class StopWatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      secondsElapsed: 0, 
      lastClearedIncrementer: null
    };
    this.incrementer = null;
    this.handleStartClick = this.handleStartClick.bind(this);
    this.handleStopClick = this.handleStopClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
  }  
    
  handleStartClick() {
    this.incrementer = setInterval( () => (
      this.setState( prevState => ({
        secondsElapsed: prevState.secondsElapsed + 1
      })), 1000)
    )
  }
  
  handleStopClick() {
    clearInterval(this.incrementer);
    this.setState({
      lastClearedIncrementer: this.incrementer
    });
  }
  
  handleResetClick() {
    clearInterval(this.incrementer);
    this.setState({
      secondsElapsed: 0,
    });
  }
  
  handleLabClick() {
    this.setState( prevState => ({
      laps: prevState.laps.concat([prevState.secondsElapsed])
    }))
  }
  
  render() {
    const {secondsElapsed, lastClearedIncrementer } = this.state;
    return (
      <div className="stopwatch">
        <h1 className="stopwatch-timer">{formattedSeconds(secondsElapsed)}</h1>
        {(secondsElapsed === 0 ||
          this.incrementer === lastClearedIncrementer
          ? <Button className="start-btn" onClick={this.handleStartClick}>Start Timer</Button>
          : <Button className="stop-btn" onClick={this.handleStopClick}>Stop Timer</Button>
        )}

        {(secondsElapsed !== 0 && this.incrementer === lastClearedIncrementer
          ? <Button onClick={this.handleResetClick}>Reset Timer</Button>
          : null
        )}
      </div>
    );
  }
}

export default StopWatch;
