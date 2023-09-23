import { ChangeEvent, FC } from 'react';
import { Button, Checkbox, IconButton, List, ListItem } from '@mui/material';
import { Delete } from '@mui/icons-material';

import { AddItemForm } from './components/AddItemForm';
import { EditableSpan } from './components/EditableSpan';

import { FilterValuesType, TaskType } from './App';

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

  const deleteTodolistHandler = () => deleteTodolist(todolistId);

  const changeTodolistTitleHandler = (title: string) =>
    changeTodolistTitle(todolistId, title);

  const changeAllFilterHandler = () => changeFilter('all', todolistId);
  const changeActiveFilterHandler = () => changeFilter('active', todolistId);
  const changeCompletedFilterHandler = () =>
    changeFilter('completed', todolistId);

  return (
    <div>
      <div>
        <EditableSpan title={title} onChange={changeTodolistTitleHandler} />
        <IconButton onClick={deleteTodolistHandler} size='medium' color='error'>
          <Delete />
        </IconButton>
      </div>

      <AddItemForm addItem={addTaskHandler} />

      <br />

      <div>
        <Button
          onClick={changeAllFilterHandler}
          variant={filter === 'all' ? 'contained' : 'outlined'}
          color='success'
          size='small'
          sx={{ marginRight: '5px' }}
        >
          All
        </Button>
        <Button
          onClick={changeActiveFilterHandler}
          variant={filter === 'active' ? 'contained' : 'outlined'}
          color='secondary'
          size='small'
          sx={{ marginRight: '5px' }}
        >
          Active
        </Button>
        <Button
          onClick={changeCompletedFilterHandler}
          variant={filter === 'completed' ? 'contained' : 'outlined'}
          color='primary'
          size='small'
          sx={{ marginRight: '5px' }}
        >
          Completed
        </Button>
      </div>

      <List>
        {tasks.map(t => {
          const removeTaskHandler = () => removeTask(t.id, todolistId);
          const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
            changeTaskStatus(t.id, e.currentTarget.checked, todolistId);
          const changeTaskTitleHandler = (title: string) =>
            changeTaskTitle(t.id, title, todolistId);

          return (
            <ListItem key={t.id} className={t.isDone ? 'is-done' : ''}>
              <IconButton
                onClick={removeTaskHandler}
                size='medium'
                color='error'
              >
                <Delete />
              </IconButton>
              <Checkbox
                color='success'
                checked={t.isDone}
                onChange={changeTaskStatusHandler}
              />
              <EditableSpan title={t.title} onChange={changeTaskTitleHandler} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};
