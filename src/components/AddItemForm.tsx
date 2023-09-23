import { KeyboardEvent, ChangeEvent, FC, useState } from 'react';
import { IconButton, TextField } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';

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
      <TextField
        value={value}
        onChange={inputChangeHandler}
        onKeyDown={onKeyPressHandler}
        error={!!error}
        label={error ? error : 'Type your text'}
        helperText={error}
        size='small'
        variant='outlined'
      />
      <IconButton onClick={addNewTask} color='primary'>
        <AddCircleOutline />
      </IconButton>
    </div>
  );
};
