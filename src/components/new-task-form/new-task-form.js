import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();

    this.state = {
      inputValue: '',
      min: '',
      sec: '',
    };

    this.inputHandler = (value) => {
      this.setState({
        inputValue: value,
      });
    };

    this.timeInputHandler = (entery, value) => {
      this.setState({
        [entery]: Math.min(+value.replace(/[^+\d]/g, ''), 59),
      });
    };

    this.submitHandler = (e) => {
      const { addTask } = this.props;
      const { inputValue, min, sec } = this.state;
      e.preventDefault();
      addTask(inputValue, +min || 0, +sec || 0);
      this.setState(() => ({
        inputValue: '',
        min: '',
        sec: '',
      }));
      this.inputRef.current.focus();
    };
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }

  render() {
    const { inputValue, min, sec } = this.state;

    return (
      <form className="new-todo-form" onSubmit={this.submitHandler}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={(e) => this.inputHandler(e.target.value)}
          ref={this.inputRef}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          value={min}
          onChange={(e) => this.timeInputHandler('min', e.target.value)}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          value={sec}
          onChange={(e) => this.timeInputHandler('sec', e.target.value)}
        />
        <input className="hidden" type="submit" />
      </form>
    );
  }
}

NewTaskForm.defaultProps = {
  addTask: () => {},
};

NewTaskForm.propTypes = {
  addTask: PropTypes.func,
};
