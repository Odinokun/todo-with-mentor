import { KeyboardEvent, ChangeEvent, useState, FC } from 'react';
import { FilterValuesType, TaskType } from './App';
import { Button } from './components/Button';

type PropsType = {
  todolistId: string;
  title: string;
  tasks: TaskType[];
  removeTask: (id: string, todolistId: string) => void;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void;
  filter: FilterValuesType;
  deleteTodolist: (todolistId: string) => void;
};

export const Todolist: FC<PropsType> = ({
  todolistId,
  title,
  tasks,
  removeTask,
  changeFilter,
  addTask,
  changeTaskStatus,
  filter,
  deleteTodolist,
}) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const addNewTask = () => {
    if (value.trim() !== '') {
      addTask(value.trim(), todolistId);
      setValue('');
    } else {
      setError('Title is required');
    }
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === 'Enter') {
      addNewTask();
    }
  };

  const changeFilterHandler = (value: FilterValuesType) =>
    changeFilter(value, todolistId);

  // const changeTaskStatusHandler = (id: string, status: boolean) => {
  //   return changeTaskStatus(id, status, todolistId);
  // };

  const deleteTodolistHandler = () => deleteTodolist(todolistId);

  return (
    <div>
      <div>
        <span>{title}</span>
        <button onClick={deleteTodolistHandler}>del</button>
      </div>
      <div>
        <input
          value={value}
          onChange={inputChangeHandler}
          onKeyDown={onKeyPressHandler}
          className={error ? 'error' : ''}
        />
        <Button title='+' callback={addNewTask} />
        {error && <div className='error-message'>{error}</div>}
      </div>
      <br />

      <div>
        <button
          className={filter === 'all' ? 'active-filter' : ''}
          onClick={() => changeFilterHandler('all')}
        >
          All
        </button>
        <button
          className={filter === 'active' ? 'active-filter' : ''}
          onClick={() => changeFilterHandler('active')}
        >
          Active
        </button>
        <button
          className={filter === 'completed' ? 'active-filter' : ''}
          onClick={() => changeFilterHandler('completed')}
        >
          Completed
        </button>
      </div>

      <ul>
        {tasks.map(t => {
          const removeTaskHandler = () => removeTask(t.id, todolistId);
          const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
            changeTaskStatus(t.id, e.currentTarget.checked, todolistId);
          return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
              <button onClick={removeTaskHandler}>del</button>
              <input
                type='checkbox'
                checked={t.isDone}
                onChange={changeTaskStatusHandler}
              />
              <span>{t.title}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
