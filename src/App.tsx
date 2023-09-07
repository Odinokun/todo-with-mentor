import React, { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { log } from 'console';

export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
  const title = 'What to learn';

  const [tasks, setTasks] = useState<TaskType[]>([
    { id: 1, title: 'HTML&CSS', isDone: true },
    { id: 2, title: 'JS', isDone: true },
    { id: 3, title: 'ReactJS', isDone: false },
    { id: 4, title: 'Rest API', isDone: false },
    { id: 5, title: 'GraphQL', isDone: false },
  ]);
  const [filter, setFilter] = useState<FilterValuesType>('all');

  const removeTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  // let tasksForTodolist = tasks;

  // if (filter === 'active') {
  //   tasksForTodolist = tasks.filter(t => !t.isDone);
  // } else if (filter === 'completed') {
  //   tasksForTodolist = tasks.filter(t => t.isDone);
  // }

  const changeFilter = (value: FilterValuesType) => setFilter(value);

  const filteredTasks = () => {
    switch (filter) {
      case 'active':
        return tasks.filter(t => !t.isDone);
      case 'completed':
        return tasks.filter(t => t.isDone);
      default:
        return tasks;
    }
  };

  return (
    <div className='App'>
      <Todolist
        title={title}
        tasks={filteredTasks()}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;
