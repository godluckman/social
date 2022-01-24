import React, { useState } from 'react';
import { DefaultRootState, useDispatch, useSelector } from 'react-redux';
import { follow, IUser } from '../redux/actions/profileAction';

interface Prop {
  user: IUser;
}

const FollowBtn = ({ user }: Prop) => {
  const [followed, setFollowed] = useState(false);

  interface INotify extends Object {
    token: string;
    user: IUser;
  }

  interface IState extends DefaultRootState {
    auth: INotify;
    profile: any;
  }
  const { auth, profile } = useSelector((state: IState) => state);
  const dispatch = useDispatch();

  const handleUnFollow = async () => {
    setFollowed(false);
  };
  const handleFollow = async () => {
    await dispatch(follow({ users: profile.users, user, auth }));
    setFollowed(true);
  };

  return (
    <>
      {followed ? (
        <button
          type='button'
          className='btn btn-outline-danger'
          onClick={handleUnFollow}
        >
          UnFollow
        </button>
      ) : (
        <button
          type='button'
          className='btn btn-outline-info'
          onClick={handleFollow}
        >
          Follow
        </button>
      )}
      <div />
    </>
  );
};

export default FollowBtn;
