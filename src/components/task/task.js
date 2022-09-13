import React, { Component } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import ruLocale from 'date-fns/locale/ru';
import PropTypes from 'prop-types';
import './task.css';

export default class Task extends Component {
  static defaultProps = {
    label: '',
    completed: false,
  };

  static propTypes = {
    label: PropTypes.string,
    onDeleted: PropTypes.func,
    onToggleActive: PropTypes.func,
    completed: PropTypes.bool,
    date: PropTypes.number,
  };

  render() {
    const { label, onDeleted, onToggleActive, completed, date } = this.props;

    let classNames = '';

    if (completed) {
      classNames = 'completed';
    }

    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onToggleActive} />
          <label>
            <span className="description">{label}</span>
            <span className="created">
              created {formatDistanceToNow(date, 'ddd/MMM/D/YYYY/hh/m/ss', { addSuffix: true, locale: ruLocale })} ago
            </span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
      </li>
    );
  }
}
