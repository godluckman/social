import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from './avatar';

export interface IUser {
  _id: string;
  avatar: string;
  userName: string;
  fullName: string;
}

interface Prop {
  user: IUser;
  children?: any;
  setShowFollowers?: CallableFunction;
  setShowFollowing?: CallableFunction;
}

const UserCard = ({
  children,
  user,
  setShowFollowers,
  setShowFollowing,
}: Prop) => (
  <div className='d-flex p-2 align-items-center'>
    <Link
      to={`/profile/${user._id}`}
      className='text-dark'
      onClick={() => setShowFollowers!(false)}
    >
      <Avatar src={user.avatar} size='avatar' />
    </Link>
    <div className='m-lg-1'>
      <span className='d-block'>{user.userName}</span>
      <small>{user.fullName}</small>
    </div>
    {children}
  </div>
);

UserCard.defaultProps = {
  children: null,
  setShowFollowers: null,
  setShowFollowing: null,
};

export default UserCard;
