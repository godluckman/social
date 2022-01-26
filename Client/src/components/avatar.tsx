import React from 'react';
import { useSelector } from 'react-redux';

interface Prop {
  src: string;
  size: string;
}

interface State {
  theme: boolean;
}

const Avatar = ({ src, size }: Prop) => {
  const { theme } = useSelector((state: State) => state);
  return (
    <img
      src={src}
      alt='avatar'
      className={size}
      style={{ filter: `${theme ? 'invert(1)' : 'invert(0)'}` }}
    />
  );
};

export default Avatar;
