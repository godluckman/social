import React from 'react';

interface Prop {
  src: string;
}

const Avatar = ({ src }: Prop) => (
  <img src={src} alt='avatar' className='avatar' />
);

export default Avatar;
