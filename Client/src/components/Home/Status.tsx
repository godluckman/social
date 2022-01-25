import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../avatar';
import { IState } from '../profile/Following';
import { allTypes } from '../../redux/actions/allTypes';

const Status = () => {
  const { auth } = useSelector((state: IState) => state);
  const dispatch = useDispatch();

  return (
    <div className='status d-flex my-3'>
      <Avatar src={auth.user.avatar} size='avatar' />
      <button
        className='statusBtn flex-fill'
        type='button'
        onClick={() => dispatch({ type: allTypes.STATUS, payload: true })}
      >
        {auth.user.userName}, is there anything you would like to share?
      </button>
    </div>
  );
};

export default Status;
