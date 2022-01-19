import React from 'react';
import Avatar from './avatar';

export interface IUser {
  _id: string;
  avatar: string;
  userName: string;
  fullName: string;
}

interface Prop {
  user: IUser;
}

const UserCard = ({ user }: Prop) => (
  <div className='d-flex p-2 align-items-center'>
    <Avatar src={user.avatar} size='avatar' />
    <div className='ml-1'>
      <span className='d-block'>{user.userName}</span>
      <small>{user.fullName}</small>
    </div>
  </div>
);

export default UserCard;
