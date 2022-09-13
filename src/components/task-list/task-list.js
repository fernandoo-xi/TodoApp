import React from 'react';
import PropTypes from 'prop-types';

import Task from '../task';

import './task-list.css';

const TaskList = ({ todos, onDeleted, onToggleActive }) => {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;

    return (
      <li key={id}>
        <Task {...itemProps} onDeleted={() => onDeleted(id)} onToggleActive={() => onToggleActive(id)} />
      </li>
    );
  });

  return <ul className="todo-list">{elements}</ul>;
};

TaskList.propTypes = {
  onDeleted: PropTypes.func,
  onToggleActive: PropTypes.func,
};

export default TaskList;
