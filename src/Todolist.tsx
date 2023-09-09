import { KeyboardEvent, ChangeEvent, useState, FC } from 'react';
import { FilterValuesType, TaskType } from './App';

type PropsType = {
  title: string;
  tasks: TaskType[];
  removeTask: (id: string) => void;
  changeFilter: (value: FilterValuesType) => void;
  addTask: (title: string) => void;
};

export const Todolist: FC<PropsType> = ({
  title,
  tasks,
  removeTask,
  changeFilter,
  addTask,
}) => {
  const [value, setValue] = useState('');

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const addNewTask = () => {
    if (value.trim() !== '') {
      addTask(value.trim());
      setValue('');
    }
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addNewTask();
    }
  };

  const changeAllFilter = () => changeFilter('all');
  const changeActiveFilter = () => changeFilter('active');
  const changeCompletedFilter = () => changeFilter('completed');

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          value={value}
          onChange={inputChangeHandler}
          onKeyDown={onKeyPressHandler}
        />
        <button onClick={addNewTask}>+</button>
      </div>
      <br />

      <div>
        <button onClick={changeAllFilter}>All</button>
        <button onClick={changeActiveFilter}>Active</button>
        <button onClick={changeCompletedFilter}>Completed</button>
      </div>

      <ul>
        {tasks.map(t => {
          const removeTaskHandler = () => removeTask(t.id);
          return (
            <li key={t.id}>
              <button onClick={removeTaskHandler}>del</button>
              <input type='checkbox' checked={t.isDone} />{' '}
              <span>{t.title}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
