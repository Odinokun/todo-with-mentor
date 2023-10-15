import { v1 } from 'uuid';
import { FilterValuesType, TodolistType } from '../App';

export const todolistReducer = (state: TodolistType[], action: TodolistReducerType): TodolistType[] => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(tl => tl.id !== action.payload.id);
    case 'ADD-TODOLIST':
      const newTodolist: TodolistType = { id: v1(), title: action.payload.title, filter: 'all' };
      return [...state, newTodolist];
    case 'CHANGE-TODOLIST-TITLE':
      return state.map(tl => tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl);
    case 'CHANGE-TODOLIST-FILTER':
      return state.map(tl => tl.id === action.payload.id ? { ...tl, filter: action.payload.filter } : tl);
    default:
      return state;
  }
};

type TodolistReducerType =
  RemoveTodolistACType
  | AddTodolistACType
  | ChangeTodolistTitleACType
  | ChangeTodolistFilterACType
type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
type AddTodolistACType = ReturnType<typeof addTodolistAC>
type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>

export const removeTodolistAC = (todolistId: string) => {
  return {
    type: 'REMOVE-TODOLIST',
    payload: {
      id: todolistId,
    },
  } as const;
};

export const addTodolistAC = (title: string) => {
  return {
    type: 'ADD-TODOLIST',
    payload: {
      title,
    },
  } as const;
};

export const changeTodolistTitleAC = (id: string, title: string) => {
  return {
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {
      id,
      title,
    },
  } as const;
};

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
  return {
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {
      id,
      filter,
    },
  } as const;
};