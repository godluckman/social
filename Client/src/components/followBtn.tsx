import React, { useEffect, useState } from 'react';
import { DefaultRootState, useDispatch, useSelector } from 'react-redux';
import { follow, IUser, unfollow } from '../redux/actions/profileAction';

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

  useEffect(() => {
    if (auth.user.following.find((item: any) => item._id === user._id))
      setFollowed(true);
  }, [auth.user.following, user._id]);

  const handleUnFollow = async () => {
    await dispatch(unfollow({ users: profile.users, user, auth }));
    setFollowed(false);
  };
  const handleFollow = async () => {
    setFollowed(true);
    await dispatch(follow({ users: profile.users, user, auth }));
  };

  return (
    <div>
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
    </div>
  );
};

export default FollowBtn;
