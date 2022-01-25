import React from 'react';
import { DefaultRootState, useSelector } from 'react-redux';
import UserCard from '../userCard';
import FollowBtn from '../followBtn';
import { IUser } from '../../redux/actions/profileAction';

export interface IAuth extends Object {
  token: string;
  user: IUser;
}
export interface IState extends DefaultRootState {
  auth: IAuth;
}

export interface IFollowProps {
  users: any;
  setShowFollowing: any;
}

const Following = ({ users, setShowFollowing }: IFollowProps) => {
  const { auth } = useSelector((state: IState) => state);
  return (
    <div className='follow'>
      <div className='follow_box'>
        <h5 className='text-center'>Following</h5>
        <hr />

        <div className='follow_content'>
          {users.map((user: IUser) => (
            <UserCard
              key={user._id}
              user={user}
              setShowFollowing={setShowFollowing}
            >
              {auth.user._id !== user._id && <FollowBtn user={user} />}
            </UserCard>
          ))}
        </div>
        <div
          className='close'
          onClick={() => setShowFollowing(false)}
          onKeyUp={() => setShowFollowing(false)}
        >
          &times;
        </div>
      </div>
    </div>
  );
};

export default Following;
