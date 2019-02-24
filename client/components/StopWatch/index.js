import React from 'react';

const formattedSeconds = (sec) => (
  Math.floor(sec / 60) + ':' + ('0' + sec % 60).slice(-2)
)

const Button = (props) => (
  <button type="button" {...props} className={"btn " + props.className } />
)
  

class StopWatch extends React.Component {   
  render() {
    const {timeElapsed, lastClearedIncrementer, incrementer, startTimer, stopTimer, resetTimer } = this.props;
    return (
      <div className="stopwatch">
        <h1 className="stopwatch-timer">{formattedSeconds(timeElapsed)}</h1>
        {(timeElapsed === 0 ||
          incrementer === lastClearedIncrementer
          ? <Button className="start-btn" onClick={() => startTimer()}>Start Timer</Button>
          : <Button className="stop-btn" onClick={() => stopTimer()}>Stop Timer</Button>
        )}

        {(timeElapsed !== 0 && incrementer === lastClearedIncrementer
          ? <Button onClick={() => resetTimer()}>Reset Timer</Button>
          : null
        )}
      </div>
    );
  }
}

export default StopWatch;
