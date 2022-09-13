import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TasksFilter from '../tasks-filter';

import './footer.css';

export default class Footer extends Component {
  static defaultProps = {
    activeCount: 0,
    filter: 'all',
  };

  static propTypes = {
    activeCount: PropTypes.number,
    filter: PropTypes.string,
    onFilterChange: PropTypes.func,
    clearCompleted: PropTypes.func,
  };

  render() {
    const { activeCount, filter, onFilterChange, clearCompleted } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count">{activeCount} items left</span>
        <TasksFilter filter={filter} onFilterChange={onFilterChange} />
        <button className="clear-completed" onClick={() => clearCompleted()}>
          Clear completed
        </button>
      </footer>
    );
  }
}
