import { DefaultRootState, useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Info from './info';
import Posts from './posts';
import { getProfileUsers } from '../../redux/actions/profileAction';

interface INotify extends Object {
  token: string;
  user: {
    _id: string;
    avatar: string;
    userName: string;
    fullName: string;
    address: string;
    email: string;
    mobile: string;
    gender: string;
    story: string;
    followers: string[];
    following: string[];
  };
}
interface IState extends DefaultRootState {
  auth: INotify;
  profile: any;
}

const Profile = () => {
  const { profile, auth } = useSelector((state: IState) => state);
  const dispatch = useDispatch();

  const { id } = useParams();
  const [saveTab, setSaveTab] = useState(false);

  useEffect(() => {
    if (profile.ids.every((item: string) => item !== id)) {
      dispatch(getProfileUsers({ id, auth }));
    }
  }, [id, auth, dispatch, profile.ids]);

  return (
    <div className='profile'>
      <Info profile={profile} auth={auth} dispatch={dispatch} id={id} />
      {profile.loading ? (
        <div className='spinner-border loading mx-auto my-4' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      ) : (
        <Posts profile={profile} auth={auth} dispatch={dispatch} id={id} />
      )}
    </div>
  );
};

export default Profile;
