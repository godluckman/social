import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions/authAction';

const Login = () => {
  const initialState = { email: '', password: '' };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const dispatch = useDispatch();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(login(userData));
  };

  return (
    <div className='auth_page'>
      <form onSubmit={handleSubmit}>
        <h3 className='text-uppercase text-center mb-4'>NSocial</h3>
        <div className='mb-3'>
          <label htmlFor='exampleInputEmail1' className='form-label'>
            Email address
            <input
              type='email'
              className='form-control'
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
              onChange={changeHandler}
              value={email}
              name='email'
            />
          </label>
          <div id='emailHelp' className='form-text'>
            Well never share your email with anyone else.
          </div>
        </div>
        <div className='mb-3'>
          <label htmlFor='exampleInputPassword1' className='form-label'>
            Password
            <input
              type='password'
              className='form-control'
              id='exampleInputPassword1'
              onChange={changeHandler}
              value={password}
              name='password'
            />
          </label>
        </div>
        <button
          type='submit'
          className='btn btn-dark w-100'
          disabled={!(email && password)}
        >
          Login
        </button>
        <p className='my-2'>
          Create an account?
          <Link to='/register' style={{ color: 'crimson' }}>
            Register now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
