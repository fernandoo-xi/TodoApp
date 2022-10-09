import { Component } from 'react';
import PropTypes from 'prop-types';

function addZero(num) {
  const str = num.toString();
  return str.length > 1 ? str : `0${str}`;
}
export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerRun: true,
    };
    this.toggleTimer = (value) => {
      const { completed } = this.props;
      if (completed) return;
      this.setState({
        timerRun: value,
      });
    };
  }

  componentDidMount() {
    const { timerUpdate, id, completed } = this.props;
    if (completed) {
      this.setState({
        timerRun: false,
      });
    } else {
      this.interval = setInterval(() => timerUpdate(id), 1000);
    }
  }

  componentDidUpdate(prevProps, PrevState) {
    const { timerUpdate, id, completed } = this.props;
    const { timerRun } = this.state;
    if (timerRun !== PrevState.timerRun) {
      if (timerRun) {
        this.interval = setInterval(() => timerUpdate(id), 1000);
      } else {
        clearInterval(this.interval);
      }
    }
    if (completed !== prevProps.completed) {
      if (completed) {
        clearInterval(this.interval);
      } else {
        this.interval = setInterval(() => timerUpdate(id), 1000);
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { timer } = this.props;

    const time = new Date(timer);

    const min = addZero(time.getMinutes());
    const sec = addZero(time.getSeconds());

    return (
      <span className="description">
        <button
          className="icon icon-play"
          type="button"
          aria-label="play-timer"
          onClick={() => this.toggleTimer(true)}
        />
        <button
          className="icon icon-pause"
          type="button"
          aria-label="pause-timer"
          onClick={() => this.toggleTimer(false)}
        />
        {`  ${min}:${sec} `}
      </span>
    );
  }
}

Timer.propTypes = {
  timerUpdate: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
};
