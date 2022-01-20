import React from 'react';
import { DefaultRootState, useSelector } from 'react-redux';
import Info from './info';
import Posts from './posts';

interface INotify extends Object {
  token: string;
  user: {
    _id: string;
    avatar: string;
    userName: string;
    fullName: string;
    address: string;
    email: string;
    story: string;
    followers: [];
    following: [];
  };
}
interface IState extends DefaultRootState {
  auth: INotify;
  profile: { loading: boolean };
}

const Profile = () => {
  const { profile } = useSelector((state: IState) => state);
  return (
    <div className='profile'>
      {profile.loading ? (
        <div className='spinner-border loading mx-auto my-4' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      ) : (
        <Info />
      )}
      <Posts />
    </div>
  );
};

export default Profile;
