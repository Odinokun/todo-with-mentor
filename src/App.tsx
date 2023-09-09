import { useState } from 'react';
import { v1 } from 'uuid';
import { Todolist } from './Todolist';
import './App.css';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
  const title = 'What to learn';

  const [tasks, setTasks] = useState<TaskType[]>([
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
    { id: v1(), title: 'Rest API', isDone: false },
    { id: v1(), title: 'GraphQL', isDone: false },
  ]);
  const [filter, setFilter] = useState<FilterValuesType>('all');

  const removeTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

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

  const addTask = (title: string) => {
    const newTask: TaskType = {
      id: v1(),
      title,
      isDone: false,
    };
    setTasks([newTask, ...tasks]);
  };

  return (
    <div className='App'>
      <Todolist
        title={title}
        tasks={filteredTasks()}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
      />
    </div>
  );
}

export default App;
