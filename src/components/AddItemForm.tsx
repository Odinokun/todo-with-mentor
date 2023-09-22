import { KeyboardEvent, ChangeEvent, FC, useState } from 'react';
import { Button } from './Button';

interface IProps {
  addItem: (title: string) => void;
}

export const AddItemForm: FC<IProps> = ({ addItem }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === 'Enter') {
      addItem(value.trim());
    }
  };

  const addNewTask = () => {
    if (value.trim() !== '') {
      addItem(value.trim());
      setValue('');
    } else {
      setError('Title is required');
    }
  };

  return (
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
  );
};
