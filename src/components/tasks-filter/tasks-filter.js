import React, { Component } from 'react';
import './tasks-filter.css';
import PropTypes from 'prop-types';

export default class TasksFilter extends Component {
  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];

  static defaultProps = {
    filter: 'all',
  };

  static propTypes = {
    filter: PropTypes.string,
    onFilterChange: PropTypes.func,
  };

  render() {
    const { filter, onFilterChange } = this.props;

    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filter === name;

      const clazz = isActive ? 'selected' : '';
      return (
        <li key={name}>
          <button className={`${clazz}`} key={name} onClick={() => onFilterChange(name)}>
            {label}
          </button>
        </li>
      );
    });

    return <ul className="filters">{buttons}</ul>;
  }
}
