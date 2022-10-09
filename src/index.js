import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import NewTaskForm from './components/new-task-form';
import TaskList from './components/task-list';
import Footer from './components/footer';
import TasksFilter from './components/tasks-filter';

import './index.css';

class App extends Component {
  constructor() {
    super();

    this.taskId = 10;

    this.state = {
      todos: {
        byId: {
          1: {
            id: 1,
            isCompleted: true,
            isEditing: false,
            description: 'Completed task',
            inputValue: 'Completed task',
            created: Date.now(),
            timer: 0,
          },
          2: {
            id: 2,
            isCompleted: false,
            isEditing: true,
            description: 'One more task',
            inputValue: 'One more task',
            created: Date.now(),
            timer: 120000,
          },
          3: {
            id: 3,
            isCompleted: false,
            isEditing: false,
            description: 'Active task',
            inputValue: 'Active task',
            created: Date.now(),
            timer: 1000,
          },
        },
        allIds: [1, 2, 3],
      },
      taskFilter: 'all',
    };

    this.createTask = (description, min = 0, sec = 0) => {
      const id = this.taskId;
      const time = (min * 60 + sec) * 1000;
      return {
        [id]: {
          id,
          isCompleted: false,
          isEditing: false,
          description,
          inputValue: description,
          created: Date.now(),
          timer: time,
        },
      };
    };

    this.addTask = (description, min, sec) => {
      this.setState(({ todos: { allIds, byId } }) => {
        this.taskId += 1;
        return {
          todos: {
            allIds: [...allIds, this.taskId],
            byId: {
              ...byId,
              ...this.createTask(description, min, sec),
            },
          },
        };
      });
    };

    this.toggleFlagById = (id, flag) => {
      this.setState(({ todos, todos: { byId } }) => ({
        todos: {
          ...todos,
          byId: {
            ...byId,
            [id]: { ...byId[id], [flag]: !byId[id][flag] },
          },
        },
      }));
    };

    this.stopEditing = () => {
      this.setState(({ todos, todos: { allIds, byId } }) => ({
        todos: {
          ...todos,
          byId: allIds.reduce((acc, id) => {
            acc[id] = { ...byId[id], isEditing: false, inputValue: byId[id].description };
            return acc;
          }, {}),
        },
      }));
    };

    this.onDelite = (deliteId) => {
      this.setState(({ todos: { byId, allIds } }) => {
        const newIds = allIds.filter((id) => id !== deliteId);
        return {
          todos: {
            allIds: newIds,
            byId: newIds.reduce((acc, id) => {
              acc[id] = byId[id];
              return acc;
            }, {}),
          },
        };
      });
    };

    this.editInputHandler = (id, value) => {
      this.setState(({ todos, todos: { byId } }) => ({
        todos: {
          ...todos,
          byId: {
            ...byId,
            [id]: { ...byId[id], inputValue: value },
          },
        },
      }));
    };

    this.editSubmit = (id, value) => {
      this.setState(({ todos, todos: { byId } }) => ({
        todos: {
          ...todos,
          byId: {
            ...byId,
            [id]: { ...byId[id], description: value },
          },
        },
      }));
    };

    this.onFilterSelect = (selectedFilter) => {
      this.setState({
        taskFilter: selectedFilter,
      });
    };

    this.clearCompleted = () => {
      this.setState(({ todos: { byId, allIds } }) => {
        const notComplitedIds = allIds.filter((id) => !byId[id].isCompleted);
        return {
          todos: {
            allIds: notComplitedIds,
            byId: notComplitedIds.reduce((acc, id) => {
              acc[id] = byId[id];
              return acc;
            }, {}),
          },
        };
      });
    };

    this.timerUpdate = (id) => {
      this.setState(({ todos, todos: { byId } }) => ({
        todos: {
          ...todos,
          byId: {
            ...byId,
            [id]: { ...byId[id], timer: byId[id].timer + 1000 },
          },
        },
      }));
    };
  }

  componentDidMount() {
    document.addEventListener('click', (e) => {
      if (e.target.tagName === 'HTML') this.stopEditing();
    });
  }

  render() {
    const { todos, taskFilter } = this.state;

    const itemsLeft = todos.allIds.filter((id) => !todos.byId[id].isCompleted).length;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm addTask={this.addTask} />
        </header>
        <section className="main">
          <TaskList
            todos={todos}
            onComplite={this.onComplite}
            toggleFlagById={this.toggleFlagById}
            onDelite={this.onDelite}
            onEdit={this.onEdit}
            inputHandler={this.editInputHandler}
            editSubmit={this.editSubmit}
            filter={taskFilter}
            timerUpdate={this.timerUpdate}
          />
          <Footer clearCompleted={this.clearCompleted} itemsLeft={itemsLeft}>
            <TasksFilter filter={taskFilter} onFilterSelect={this.onFilterSelect} />
          </Footer>
        </section>
      </section>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
