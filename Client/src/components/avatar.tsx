import React from 'react';

interface Prop {
  src: string;
  size: string;
}

const Avatar = ({ src, size }: Prop) => (
  <img src={src} alt='avatar' className={size} />
);

export default Avatar;
