import { useState } from 'react';
import { v1 } from 'uuid';

import { Todolist } from './Todolist';
import { AddItemForm } from './components/AddItemForm';
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material';
import { Menu } from '@mui/icons-material';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: TaskType[];
};

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, setTodolists] = useState<TodolistType[]>([
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'active' },
  ]);

  const [tasksObj, setTasksObj] = useState<TasksStateType>({
    [todolistId1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
      { id: v1(), title: 'Rest API', isDone: false },
      { id: v1(), title: 'GraphQL', isDone: false },
      { id: v1(), title: 'Redux', isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: 'Book', isDone: false },
      { id: v1(), title: 'Milk', isDone: true },
      { id: v1(), title: 'Meat', isDone: true },
      { id: v1(), title: 'Bread', isDone: false },
      { id: v1(), title: 'Fish', isDone: false },
    ],
  });

  const removeTask = (id: string, todolistId: string) => {
    setTasksObj({
      ...tasksObj,
      [todolistId]: tasksObj[todolistId].filter(t => t.id !== id),
    });
  };

  const changeFilter = (value: FilterValuesType, todolistId: string) => {
    setTodolists(
      todolists.map(tl =>
        tl.id === todolistId ? { ...tl, filter: value } : tl
      )
    );
  };

  const addTask = (title: string, todolistId: string) => {
    const newTask: TaskType = {
      id: v1(),
      title,
      isDone: false,
    };
    setTasksObj({
      ...tasksObj,
      [todolistId]: [newTask, ...tasksObj[todolistId]],
    });
  };

  const changeTaskStatus = (
    id: string,
    isDone: boolean,
    todolistId: string
  ) => {
    setTasksObj({
      ...tasksObj,
      [todolistId]: tasksObj[todolistId].map(t =>
        t.id === id ? { ...t, isDone } : t
      ),
    });
  };

  const deleteTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(tl => tl.id !== todolistId));
    delete tasksObj[todolistId];
  };

  const addTodolist = (title: string) => {
    const newTodolistId = v1();
    setTodolists([...todolists, { id: newTodolistId, title, filter: 'all' }]);
    setTasksObj({
      ...tasksObj,
      [newTodolistId]: [],
    });
  };

  const changeTodolistTitle = (id: string, title: string) => {
    setTodolists(todolists.map(tl => (tl.id === id ? { ...tl, title } : tl)));
  };

  const changeTaskTitle = (id: string, title: string, todolistId: string) => {
    setTasksObj({
      ...tasksObj,
      [todolistId]: tasksObj[todolistId].map(t =>
        t.id === id ? { ...t, title } : t
      ),
    });
  };

  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color='inherit'>Login</Button>
        </Toolbar>
      </AppBar>

      <Container fixed>
        <Grid container style={{ padding: '30px 0' }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>

        <Grid container spacing={3}>
          {todolists.map(tl => {
            const filteredTasks = () => {
              switch (tl.filter) {
                case 'active':
                  return tasksObj[tl.id].filter(t => !t.isDone);
                case 'completed':
                  return tasksObj[tl.id].filter(t => t.isDone);
                default:
                  return tasksObj[tl.id];
              }
            };

            return (
              <Grid item xs={4}>
                <Paper
                  elevation={3}
                  style={{ padding: '20px', height: '100%' }}
                >
                  <Todolist
                    key={tl.id}
                    todolistId={tl.id}
                    title={tl.title}
                    tasks={filteredTasks()}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    filter={tl.filter}
                    deleteTodolist={deleteTodolist}
                    changeTodolistTitle={changeTodolistTitle}
                    changeTaskTitle={changeTaskTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}

export default App;
