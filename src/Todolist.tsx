import { KeyboardEvent, ChangeEvent, useState, FC } from 'react';
import { FilterValuesType, TaskType } from './App';
import { Button } from './components/Button';

type PropsType = {
  title: string;
  tasks: TaskType[];
  removeTask: (id: string) => void;
  changeFilter: (value: FilterValuesType) => void;
  addTask: (title: string) => void;
  changeTaskStatus: (id: string, isDone: boolean) => void;
  filter: FilterValuesType;
};

export const Todolist: FC<PropsType> = ({
                                          title,
                                          tasks,
                                          removeTask,
                                          changeFilter,
                                          addTask,
                                          changeTaskStatus,
                                          filter,
                                        }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const addNewTask = () => {
    if (value.trim() !== '') {
      addTask(value.trim());
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

  const changeFilterHandler = (value: FilterValuesType) => changeFilter(value);

  const changeTaskStatusHandler = (id: string, status: boolean) => {
    return (
      changeTaskStatus(id, status)
    );
  };


  return (
    <div>
      <h3>{ title }</h3>
      <div>
        <input
          value={ value }
          onChange={ inputChangeHandler }
          onKeyDown={ onKeyPressHandler }
          className={ error ? 'error' : '' }
        />
        <Button title="+" callback={ addNewTask }/>
        { error && <div className="error-message">{ error }</div> }
      </div>
      <br/>

      <div>
        <button
          className={ filter === 'all' ? 'active-filter' : '' }
          onClick={ () => changeFilterHandler('all') }>
          All
        </button>
        <button
          className={ filter === 'active' ? 'active-filter' : '' }
          onClick={ () => changeFilterHandler('active') }>
          Active
        </button>
        <button
          className={ filter === 'completed' ? 'active-filter' : '' }
          onClick={ () => changeFilterHandler('completed') }>
          Completed
        </button>
      </div>

      <ul>
        { tasks.map(t => {
          const removeTaskHandler = () => removeTask(t.id);
          // const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(t.id, e.currentTarget.checked);
          return (
            <li key={ t.id } className={ t.isDone ? 'is-done' : '' }>
              <button onClick={ removeTaskHandler }>del</button>
              <input type="checkbox"
                     checked={ t.isDone }
                     onChange={ (e) => changeTaskStatusHandler(t.id, e.currentTarget.checked) }/>
              <span>{ t.title }</span>
            </li>
          );
        }) }
      </ul>
    </div>
  );
};
