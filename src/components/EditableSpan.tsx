import { KeyboardEvent, ChangeEvent, FC, useState } from 'react';

interface IProps {
  title: string;
  onChange: (title: string) => void;
}

export const EditableSpan: FC<IProps> = ({ title, onChange }) => {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const activateEditMode = () => {
    setNewTitle(title);
    setEditMode(true);
  };

  const activateViewMode = () => {
    setEditMode(false);
    onChange(newTitle);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      activateViewMode();
    }
  };

  return (
    <>
      {editMode ? (
        <input
          value={newTitle}
          onChange={onChangeHandler}
          onBlur={activateViewMode}
          onKeyDown={onKeyPressHandler}
          autoFocus
        />
      ) : (
        <span onDoubleClick={activateEditMode}>{title}</span>
      )}
    </>
  );
};
