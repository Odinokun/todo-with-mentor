import { FilterValuesType, TaskType } from './App';

type PropsType = {
  title: string;
  tasks: TaskType[];
  removeTask: (id: number) => void;
  changeFilter: (value: FilterValuesType) => void;
};

export const Todolist = (props: PropsType) => {
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <br />

      <div>
        <button onClick={() => props.changeFilter('all')}>All</button>
        <button onClick={() => props.changeFilter('active')}>Active</button>
        <button onClick={() => props.changeFilter('completed')}>
          Completed
        </button>
      </div>

      <ul>
        {props.tasks.map(t => {
          return (
            <li key={t.id}>
              <button onClick={() => props.removeTask(t.id)}>del</button>
              <input type='checkbox' checked={t.isDone} />{' '}
              <span>{t.title}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
