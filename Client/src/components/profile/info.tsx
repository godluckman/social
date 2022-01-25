import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Avatar from '../avatar';
import { getProfileUsers, IUser } from '../../redux/actions/profileAction';
import EditProfile from './editProfile';
import FollowBtn from '../followBtn';
import Followers from './Followers';
import Following from './Following';

const Info = ({ auth, profile }: any) => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const [userData, setUserData] = useState<IUser[]>([]);
  const [onEdit, setOnEdit] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  useEffect(() => {
    if (id === auth.user._id) {
      setUserData([auth.user]);
    } else {
      dispatch(getProfileUsers({ users: profile.users, id, auth }));
      const newData = profile.users.filter((user: IUser) => user._id === id);
      setUserData(newData);
    }
  }, [id, auth, dispatch, profile.users, profile]);

  return (
    <div className='info'>
      {userData.map((user: IUser) => (
        <div className='info_container' key={user._id}>
          <Avatar src={user.avatar} size='avatar-large' />
          <div className='info_content'>
            <div className='info_content_title'>
              <h2>{user.userName}</h2>
              {user._id === auth.user._id ? (
                <button
                  type='button'
                  className='btn btn-outline-info'
                  onClick={() => setOnEdit(true)}
                >
                  Edit Profile
                </button>
              ) : (
                <FollowBtn user={user} />
              )}
            </div>
            <div className='follow_btn'>
              <span
                className='m-0'
                onClick={() => setShowFollowers(true)}
                onKeyUp={() => setShowFollowers(true)}
              >
                {user.followers.length} Followers{' '}
              </span>
              <span
                className='m-lg-4'
                onClick={() => setShowFollowing(true)}
                onKeyUp={() => setShowFollowing(true)}
              >
                {user.following.length} Following{' '}
              </span>
            </div>
            <h6 className='m-0'>{user.fullName}</h6>
            <p className='m-0'>{user.address}</p>
            <p className='m-0'>
              <a
                href={`mailto:${user.email}?subject=Социальная сеть NSOCIAL&amp;body=Здравствуйте!`}
              >
                {user.email}
              </a>
            </p>
            <p>{user.story}</p>
          </div>
          {onEdit && <EditProfile setOnEdit={setOnEdit} />}
          {showFollowers && (
            <Followers
              users={user.followers}
              setShowFollowers={setShowFollowers}
            />
          )}
          {showFollowing && (
            <Following
              users={user.following}
              setShowFollowing={setShowFollowing}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Info;
