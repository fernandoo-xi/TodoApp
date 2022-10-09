import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Task extends Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();

    this.onSubmitHandler = (e) => {
      const { id, editSubmit, toggleFlagById, inputValue } = this.props;
      e.preventDefault();
      editSubmit(id, inputValue);
      toggleFlagById(id, 'isEditing');
    };

    this.keyDownHandler = (e) => {
      const { toggleFlagById, id, description, inputHandler } = this.props;
      if (e.key === 'Escape') {
        toggleFlagById(id, 'isEditing');
        inputHandler(id, description);
      }
    };
  }

  componentDidUpdate(prevProps) {
    const { isEditing } = this.props;
    if (isEditing !== prevProps.isEditing && isEditing) this.inputRef.current.focus();
  }

  keyDownHandler(e) {
    const { toggleFlagById, id, description, inputHandler } = this.props;
    if (e.key === 'Escape') {
      toggleFlagById(id, 'isEditing');
      inputHandler(id, description);
    }
  }

  render() {
    const { id, isCompleted, isEditing, inputValue, onDelite, toggleFlagById, inputHandler, children } = this.props;

    const taskInput = isEditing ? (
      <form onSubmit={(e) => this.onSubmitHandler(e)}>
        <input
          type="text"
          className="edit"
          value={inputValue}
          required
          onChange={(e) => inputHandler(id, e.target.value)}
          onKeyDown={(e) => this.keyDownHandler(e)}
          ref={this.inputRef}
        />
      </form>
    ) : (
      ''
    );

    const htmlLabel = `task-${id}`;

    const completed = isCompleted ? 'completed' : '';
    const taskClass = isEditing ? 'editing' : completed;

    return (
      <li className={taskClass}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={isCompleted}
            onChange={() => toggleFlagById(id, 'isCompleted')}
            id={htmlLabel}
          />
          <label htmlFor={htmlLabel}>{children}</label>
          <button
            className="icon icon-edit"
            onClick={() => toggleFlagById(id, 'isEditing')}
            type="button"
            aria-label="edit"
          />
          <button className="icon icon-destroy" onClick={() => onDelite(id)} type="button" aria-label="delite" />
        </div>
        {taskInput}
      </li>
    );
  }
}

Task.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  onDelite: PropTypes.func.isRequired,
  toggleFlagById: PropTypes.func.isRequired,
  inputHandler: PropTypes.func.isRequired,
  editSubmit: PropTypes.func.isRequired,
};
