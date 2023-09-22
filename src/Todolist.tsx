import { ChangeEvent, FC } from 'react';
import { FilterValuesType, TaskType } from './App';
import { AddItemForm } from './components/AddItemForm';
import { EditableSpan } from './components/EditableSpan';

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
  changeTodolistTitle: (id: string, title: string) => void;
  changeTaskTitle: (id: string, title: string, todolistId: string) => void;
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
  changeTodolistTitle,
  changeTaskTitle,
}) => {
  const addTaskHandler = (title: string) => addTask(title, todolistId);

  const changeFilterHandler = (value: FilterValuesType) =>
    changeFilter(value, todolistId);

  const deleteTodolistHandler = () => deleteTodolist(todolistId);

  const changeTodolistTitleHandler = (title: string) =>
    changeTodolistTitle(todolistId, title);

  return (
    <div>
      <div>
        <EditableSpan title={title} onChange={changeTodolistTitleHandler} />
        <button onClick={deleteTodolistHandler}>del</button>
      </div>

      <AddItemForm addItem={addTaskHandler} />

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
          const changeTaskTitleHandler = (title: string) =>
            changeTaskTitle(t.id, title, todolistId);

          return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
              <button onClick={removeTaskHandler}>del</button>
              <input
                type='checkbox'
                checked={t.isDone}
                onChange={changeTaskStatusHandler}
              />
              <EditableSpan title={t.title} onChange={changeTaskTitleHandler} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
