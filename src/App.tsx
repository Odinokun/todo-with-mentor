import React from 'react';
import './App.css';
import { Todolist } from './Todolist';

function App() {
  const title1 = 'What to learn';
  const title2 = 'What to bye';

  const tasks1 = [
    { id: 1, title: 'HTML&CSS', isDone: true },
    { id: 2, title: 'JS', isDone: true },
    { id: 3, title: 'ReactJS', isDone: false },
    { id: 4, title: 'Rest API', isDone: false },
    { id: 5, title: 'GraphQL', isDone: false },
  ];
  const tasks2 = [
    { id: 2, title: 'Milk', isDone: true },
    { id: 3, title: 'Meat', isDone: true },
    { id: 4, title: 'Bread', isDone: false },
  ];

  return (
    <div className='App'>
      <Todolist title={title1} tasks={tasks1} />
      <Todolist title={title2} tasks={tasks2} />
    </div>
  );
}

export default App;
