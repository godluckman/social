import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { DefaultRootState, useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/authAction';
import allTypes from '../redux/actions/allTypes';

const Header = () => {
  const navLinks = [
    { label: 'Home', icon: 'home', path: '/' },
    { label: 'Message', icon: 'near_me', path: '/message' },
    { label: 'Discover', icon: 'explore', path: '/discover' },
  ];

  interface INotify extends Object {
    token: string;
    user: { _id: string };
  }
  interface IState extends DefaultRootState {
    auth: INotify;
    theme: any;
    notify: any;
  }

  const { auth, theme, notify } = useSelector((state: IState) => state);
  const dispatch = useDispatch();
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light justify-content-between align-middle'>
      <div className='container-fluid'>
        <Link
          to='/'
          className='logo'
          onClick={() => window.scrollTo({ top: 0 })}
        >
          <h1 className='navbar-brand text-uppercase p-0 m-0'>V-Network</h1>
        </Link>
        <div className='menu'>
          <ul className='navbar-nav flex-row mb-2 mb-lg-0'>
            {navLinks.map((link) => (
              <li className='nav-item px-2' key={link.label}>
                <NavLink
                  className='nav-link'
                  aria-current='page'
                  to={link.path}
                >
                  <span className='material-icons'>{link.icon}</span>
                </NavLink>
              </li>
            ))}
            <li className='nav-item'>
              <div className='nav-link active' aria-current='page'>
                Home
              </div>
            </li>
            <li className='nav-item dropdown'>
              <div
                className='nav-link dropdown-toggle'
                id='navbarDropdown'
                role='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                User
              </div>
              <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
                <li>
                  <Link
                    className='dropdown-item'
                    to={`/profile/${auth.user._id}`}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
                  <label
                    htmlFor='theme'
                    className='dropdown-item'
                    onClick={() =>
                      dispatch({ type: allTypes.THEME, payload: !theme })
                    }
                    onKeyUp={() =>
                      dispatch({ type: allTypes.THEME, payload: !theme })
                    }
                  >
                    {theme ? 'Light mode' : 'Dark mode'}
                  </label>
                </li>
                <li>
                  <hr className='dropdown-divider' />
                </li>
                <li>
                  <Link
                    className='dropdown-item'
                    to='/'
                    onClick={() => dispatch(logout())}
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
