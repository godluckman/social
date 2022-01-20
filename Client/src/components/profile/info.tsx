import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DefaultRootState, useDispatch, useSelector } from 'react-redux';
import Avatar from '../avatar';
import { getProfileUsers, IUser } from '../../redux/actions/profileAction';

const Info = () => {
  const { id } = useParams();

  interface INotify {
    token: string;
    user: IUser;
  }
  interface IState extends DefaultRootState {
    auth: INotify;
    profile: { users: IUser[] };
  }

  const { auth, profile } = useSelector((state: IState) => state);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState<IUser[]>([]);

  useEffect(() => {
    if (id === auth.user._id) {
      setUserData([auth.user]);
    } else {
      dispatch(getProfileUsers({ users: profile.users, id, auth }));
      const newData = profile.users.filter((user: IUser) => user._id === id);
      setUserData(newData);
    }
  }, [id, auth, dispatch, profile.users]);

  return (
    <div className='info'>
      {userData.map((user: IUser) => (
        <div className='info_container' key={user._id}>
          <Avatar src={user.avatar} size='avatar-large' />
          <div className='info_content'>
            <div className='info_content_title'>
              <h2>{user.userName}</h2>
              <button
                type='button'
                className='btn btn-outline-info'
                // onClick={() => setOnEdit(true)}
              >
                Edit Profile
              </button>
            </div>
            <div className='follow_btn'>
              <span className='m-0'>{user.followers.length} Followers </span>
              <span className='m-lg-4'>{user.following.length} Following </span>
            </div>
            <h6>{user.fullName}</h6>
            <p>{user.address}</p>
            <p>
              <a
                href={`mailto:${user.email}?subject=Социальная сеть NSOCIAL&amp;body=Здравствуйте!`}
              >
                {user.email}
              </a>
            </p>
            <p>{user.story}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Info;
