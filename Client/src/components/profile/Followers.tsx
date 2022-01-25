import React from 'react';
import { useSelector } from 'react-redux';
import UserCard from '../userCard';
import FollowBtn from '../followBtn';
import { IState } from './Following';
import { IUser } from '../../redux/actions/profileAction';

export interface IFollowProps {
  users: any;
  setShowFollowers: any;
}

const Followers = ({ users, setShowFollowers }: IFollowProps) => {
  const { auth } = useSelector((state: IState) => state);
  return (
    <div className='follow'>
      <div className='follow_box'>
        <h5 className='text-center'>Followers</h5>
        <hr />

        <div className='follow_content'>
          {users.map((user: IUser) => (
            <UserCard
              key={user._id}
              user={user}
              setShowFollowers={setShowFollowers}
            >
              {auth.user._id !== user._id && <FollowBtn user={user} />}
            </UserCard>
          ))}
        </div>
        <div
          className='close'
          onClick={() => setShowFollowers(false)}
          onKeyUp={() => setShowFollowers(false)}
        >
          &times;
        </div>
      </div>
    </div>
  );
};

export default Followers;
