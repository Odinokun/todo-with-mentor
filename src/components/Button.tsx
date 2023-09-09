import { FC } from 'react';

interface IProps {
  title: string;
  callback: () => void;
}

export const Button: FC<IProps> = ({ title, callback }) => {
  const onClickHandler = () => callback();
  return <button onClick={onClickHandler}>{title}</button>;
};
