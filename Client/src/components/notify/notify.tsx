import React from 'react';
import { DefaultRootState, useDispatch, useSelector } from 'react-redux';
import Loading from './loading';
import Toast from './toast';
import allTypes from '../../redux/actions/allTypes';

interface INotify extends Object {
  loading: string;
  error: string;
  success: string;
}
interface RootState extends DefaultRootState {
  alert: INotify;
}

const Alert = () => {
  const { alert } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  return (
    <div>
      {alert.loading && <Loading />}
      {alert.error && (
        <Toast
          msg={{ title: 'Error', body: alert.error }}
          handleShow={() => dispatch({ type: allTypes.ALERT, payload: {} })}
          bgColor='bg-danger'
        />
      )}
      {alert.success && (
        <Toast
          msg={{ title: 'Success', body: alert.success }}
          handleShow={() => dispatch({ type: allTypes.ALERT, payload: {} })}
          bgColor='bg-success'
        />
      )}
    </div>
  );
};

export default Alert;
