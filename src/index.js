import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';

import NewTaskForm from './components/new-task-form';
import TaskList from './components/task-list';
import Footer from './components/footer';
import TasksFilter from './components/tasks-filter';

import './index.css';

const initialState = {
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
};

export default function App() {
  const [todos, setTodos] = useState(initialState);
  const [taskFilter, setTaskFilter] = useState('all');
  const [newTaskId, setNewTaskId] = useState(10);

  const itemsLeft = useMemo(() => todos.allIds.filter((id) => !todos.byId[id].isCompleted).length, [todos]);

  const createTask = (description, min = 0, sec = 0) => {
    const time = (min * 60 + sec) * 1000;
    return {
      [newTaskId]: {
        id: newTaskId,
        isCompleted: false,
        isEditing: false,
        description,
        inputValue: description,
        created: Date.now(),
        timer: time,
      },
    };
  };

  const addTask = useCallback(
    (description, min, sec) => {
      setNewTaskId((id) => id + 1);
      setTodos((s) => {
        const { byId, allIds } = s;
        return { byId: { ...byId, ...createTask(description, min, sec) }, allIds: [...allIds, newTaskId] };
      });
    },
    [newTaskId]
  );

  const toggleFlagById = (id, flag) => {
    setTodos((s) => {
      const { byId, allIds } = s;
      return { byId: { ...byId, [id]: { ...byId[id], [flag]: !byId[id][flag] } }, allIds: [...allIds] };
    });
  };

  const stopEditing = () => {
    setTodos((s) => {
      const { byId, allIds } = s;
      return {
        byId: allIds.reduce((acc, id) => {
          acc[id] = { ...byId[id], isEditing: false, inputValue: byId[id].description };
          return acc;
        }, {}),
        allIds: [...allIds],
      };
    });
  };

  useEffect(() => {
    document.addEventListener('click', (e) => {
      if (e.target.tagName === 'HTML') stopEditing();
    });
  }, []);

  const onDelite = (deliteId) => {
    setTodos((s) => {
      const { byId, allIds } = s;
      const newIds = allIds.filter((id) => id !== deliteId);
      return {
        byId: newIds.reduce((acc, id) => {
          acc[id] = byId[id];
          return acc;
        }, {}),
        allIds: [...newIds],
      };
    });
  };

  const editInputHandler = (id, value) => {
    setTodos((s) => {
      const { byId, allIds } = s;
      return { byId: { ...byId, [id]: { ...byId[id], inputValue: value } }, allIds: [...allIds] };
    });
  };

  const editSubmit = (id, value) => {
    setTodos((s) => {
      const { byId, allIds } = s;
      return { byId: { ...byId, [id]: { ...byId[id], description: value } }, allIds: [...allIds] };
    });
  };

  const clearCompleted = () => {
    setTodos((s) => {
      const { byId, allIds } = s;
      const notComplitedIds = allIds.filter((id) => !byId[id].isCompleted);
      return {
        byId: notComplitedIds.reduce((acc, id) => {
          acc[id] = byId[id];
          return acc;
        }, {}),
        allIds: [...notComplitedIds],
      };
    });
  };

  const timerUpdate = useCallback((id) => {
    setTodos((s) => {
      const { byId, allIds } = s;
      return { byId: { ...byId, [id]: { ...byId[id], timer: byId[id].timer + 1000 } }, allIds: [...allIds] };
    });
  }, []);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm addTask={addTask} />
      </header>
      <section className="main">
        <TaskList
          todos={todos}
          toggleFlagById={toggleFlagById}
          onDelite={onDelite}
          inputHandler={editInputHandler}
          editSubmit={editSubmit}
          filter={taskFilter}
          timerUpdate={timerUpdate}
        />
        <Footer clearCompleted={clearCompleted} itemsLeft={itemsLeft} filter={taskFilter}>
          <TasksFilter filter={taskFilter} onFilterSelect={setTaskFilter} />
        </Footer>
      </section>
    </section>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
