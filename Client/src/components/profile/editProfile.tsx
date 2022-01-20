import React, { useEffect, useState } from 'react';
import { DefaultRootState, useDispatch, useSelector } from 'react-redux';
import { IUser } from '../../redux/actions/profileAction';
import allTypes from '../../redux/actions/allTypes';
import checkImage from '../../redux/utils/imageUpload';

const EditProfile = ({ setOnEdit }: any) => {
  const initState = {
    fullName: '',
    mobile: '',
    address: '',
    story: '',
    gender: '',
  };
  const [userData, setUserData] = useState(initState);
  const { fullName, mobile, address, story, gender } = userData;

  const [avatar, setAvatar] = useState('');

  interface INotify extends Object {
    token: string;
    user: IUser;
  }
  interface IState extends DefaultRootState {
    auth: INotify;
    theme: string;
  }

  const { auth, theme } = useSelector((state: IState) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    setUserData(auth.user);
  }, [auth.user]);

  const changeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore // TODO
    const file = e.target.files[0];

    const err = checkImage(file);
    if (err)
      return dispatch({
        type: allTypes.ALERT,
        payload: { error: err },
      });

    // @ts-ignore // TODO
    setAvatar(file);
    return null;
  };

  const handleInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className='edit_profile'>
      <button
        type='button'
        className='btn btn-danger btn_close'
        onClick={() => setOnEdit(false)}
      >
        Close
      </button>
      <form>
        <div className='info_avatar'>
          <img
            alt='avatar'
            src={avatar ? auth.user.avatar : auth.user.avatar}
            style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
          />
          <span>
            <i className='fas fa-camera' />
            <p>Change</p>
            <input
              type='file'
              name='file'
              id='file_up'
              accept='image/*'
              onChange={changeAvatar}
            />
          </span>
        </div>
        <div className='form-group'>
          <label htmlFor='fullName'>
            Full Name{' '}
            <div className='position-relative'>
              <input
                type='text'
                className='form-control'
                id='fullName'
                name='fullName'
                value={fullName}
                onChange={handleInput}
              />
              <small
                className='text-danger position-absolute'
                style={{
                  top: '50%',
                  right: '5px',
                  transform: 'translateY(-50%)',
                }}
              >
                {fullName.length}/25
              </small>
            </div>
          </label>
        </div>
        <div className='form-group'>
          <label htmlFor='mobile'>
            Mobile{' '}
            <input
              type='text'
              name='mobile'
              value={mobile}
              className='form-control'
              onChange={handleInput}
            />
          </label>
        </div>
        <div className='form-group'>
          <label htmlFor='address'>
            Address
            <input
              type='text'
              name='address'
              value={address}
              className='form-control'
              onChange={handleInput}
            />
          </label>
        </div>
        <div className='form-group'>
          <label htmlFor='story'>
            Story{' '}
            <textarea
              name='story'
              value={story}
              cols={30}
              rows={4}
              className='form-control'
              onChange={handleInput}
            />
            <small className='text-danger d-block text-right'>
              {story.length}/200
            </small>
          </label>
        </div>
        <div className='form-group'>
          <label htmlFor='gender'>
            Gender{' '}
            <div className='input-group-prepend px-0 mb-4'>
              <select
                name='gender'
                id='gender'
                value={gender}
                className='form-select form-select-sm'
                aria-label='.form-select-sm example'
                onChange={handleInput}
              >
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='other'>Other</option>
              </select>
            </div>
          </label>
        </div>
        <button className='btn btn-outline-info w-100' type='submit'>
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
