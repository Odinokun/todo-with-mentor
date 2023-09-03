type PropsType = {
  title: string;
  tasks: TaskType[];
};

type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

export const Todolist = (props: PropsType) => {
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        {props.tasks.map(t => {
          return (
            <li key={t.id}>
              <input type='checkbox' checked={t.isDone} />{' '}
              <span>{t.title}</span>
            </li>
          );
        })}
      </ul>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  );
};