import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import NewTaskForm from './components/new-task-form';
import TaskList from './components/task-list';
import Footer from './components/footer';

import './index.css';

class App extends Component {
  maxId = 100;

  state = {
    todoData: [],
    filter: '',
  };

  createTask(label) {
    return {
      label,
      completed: false,
      editing: false,
      id: this.maxId++,
      date: Date.now(),
    };
  }

  deleteTask = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newTodoData = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

      return {
        todoData: newTodoData,
      };
    });
  };

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      const active = todoData.filter((el) => !el.completed);

      return {
        todoData: active,
      };
    });
  };

  addTask = (text) => {
    const newTask = this.createTask(text);

    this.setState(({ todoData }) => {
      const newAddTask = [...todoData, newTask];

      return {
        todoData: newAddTask,
      };
    });
  };

  onToggleActive = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const oldItem = todoData[idx];
      const newItem = { ...oldItem, completed: !oldItem.completed };
      const newTodoData = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];

      return {
        todoData: newTodoData,
      };
    });
  };

  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.completed);
      case 'completed':
        return items.filter((item) => item.completed);
      default:
        return items;
    }
  }

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  render() {
    const { todoData, filter } = this.state;
    const visibleTask = this.filter(todoData, filter);
    const activeCount = todoData.filter((el) => !el.completed).length;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onTaskAdded={this.addTask} />
        </header>
        <section className="main">
          <TaskList todos={visibleTask} onDeleted={this.deleteTask} onToggleActive={this.onToggleActive} />
          <Footer
            activeCount={activeCount}
            filter={filter}
            onFilterChange={this.onFilterChange}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
