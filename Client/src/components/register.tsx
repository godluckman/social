import React, { useEffect, useState } from 'react';
import { DefaultRootState, useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../redux/actions/authAction';
import { IErr } from '../redux/utils/valid';

interface INotify extends Object {
  token: string;
}

interface IState extends DefaultRootState {
  auth: INotify;
  alert: IErr;
}

const Register = () => {
  const { auth, alert } = useSelector((state: IState) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.token) {
      navigate('/', { replace: true });
    }
  }, [auth.token, navigate]);

  const initialState = {
    fullName: '',
    userName: '',
    email: '',
    password: '',
    cfPassword: '',
    gender: 'male',
  };
  const [userData, setUserData] = useState(initialState);
  const { fullName, userName, email, password, cfPassword } = userData;
  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(register(userData));
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className='auth_page'>
      <form onSubmit={handleSubmit}>
        <h3 className='text-uppercase text-center mb-4'>NSocial</h3>
        <div className='mb-3'>
          <label htmlFor='fullName' className='form-label'>
            Full name
            <input
              type='text'
              className='form-control'
              id='fullName'
              onChange={changeHandler}
              value={fullName}
              name='fullName'
              style={{ background: `${alert.fullName ? '#fd2d6a14' : ''}` }}
            />
          </label>
          <small className='form-text text-danger'>
            {alert.fullName !== fullName ? alert.fullName : ''}
          </small>
        </div>
        <div className='mb-3'>
          <label htmlFor='userName' className='form-label'>
            Username
            <input
              type='text'
              className='form-control'
              id='userName'
              onChange={changeHandler}
              value={userName.toLowerCase().replace(/ /g, '')}
              name='userName'
              style={{ background: `${alert.userName ? '#fd2d6a14' : ''}` }}
            />
          </label>
          <small className='form-text text-danger'>
            {alert.userName !== userName ? alert.userName : ''}
          </small>
        </div>
        <div className='mb-3'>
          <label htmlFor='exampleInputEmail1' className='form-label'>
            Email address
            <input
              type='email'
              className='form-control'
              id='exampleInputEmail1'
              onChange={changeHandler}
              value={email}
              name='email'
              style={{ background: `${alert.email ? '#fd2d6a14' : ''}` }}
            />
          </label>

          <small className='form-text text-danger'>
            {alert.email !== email ? alert.email : ''}
          </small>
        </div>
        <div className='mb-3'>
          <label htmlFor='exampleInputPassword1' className='form-label'>
            Password
            <div className='pass'>
              <input
                type={typePass ? 'text' : 'password'}
                className='form-control'
                id='exampleInputPassword1'
                onChange={changeHandler}
                value={password}
                name='password'
                style={{ background: `${alert.password ? '#fd2d6a14' : ''}` }}
              />
              <small
                onClick={() => setTypePass(!typePass)}
                onKeyDown={() => setTypePass(!typePass)}
              >
                {typePass ? 'Hide' : 'Show'}
              </small>
            </div>
          </label>
        </div>
        <div className='mb-3'>
          <label htmlFor='cfPassword' className='form-label'>
            Confirm password
            <div className='pass'>
              <input
                type={typeCfPass ? 'text' : 'password'}
                className='form-control'
                id='cfPassword'
                onChange={changeHandler}
                value={cfPassword}
                name='cfPassword'
                style={{ background: `${alert.cfPassword ? '#fd2d6a14' : ''}` }}
              />
              <small
                onClick={() => setTypeCfPass(!typeCfPass)}
                onKeyDown={() => setTypeCfPass(!typeCfPass)}
              >
                {typeCfPass ? 'Hide' : 'Show'}
              </small>
            </div>
          </label>
        </div>
        <div className='row justify-content-between mx-0 mb-1'>
          <label htmlFor='male'>
            Male:{' '}
            <input
              type='radio'
              id='male'
              name='gender'
              value='male'
              defaultChecked
              onChange={handleChangeInput}
            />
          </label>

          <label htmlFor='female'>
            Female:{' '}
            <input
              type='radio'
              id='female'
              name='gender'
              value='female'
              onChange={handleChangeInput}
            />
          </label>

          <label htmlFor='other'>
            Other:{' '}
            <input
              type='radio'
              id='other'
              name='gender'
              value='other'
              onChange={handleChangeInput}
            />
          </label>
        </div>
        <button type='submit' className='btn btn-dark w-100'>
          Register
        </button>
        <p className='my-2'>
          Already have an account?
          <Link to='/login' style={{ color: 'crimson' }}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};
export default Register;
