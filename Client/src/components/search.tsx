import React, { useState } from 'react';
import { DefaultRootState, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDataApi } from '../redux/utils/fetchData';
import allTypes from '../redux/actions/allTypes';
import UserCard, { IUser } from './userCard';

interface IState extends DefaultRootState {
  auth: { token: string };
}

const Search = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [load, setLoad] = useState(false);

  const { auth } = useSelector((state: IState) => state);
  const dispatch = useDispatch();

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search) return;
    try {
      setLoad(true);
      const res = await getDataApi(`search?userName=${search}`, auth.token);
      setUsers(res.data.users);
      setLoad(false);
    } catch (err: any) {
      dispatch({
        type: allTypes.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

  const handleClose = () => {
    setSearch('');
    setUsers([]);
  };

  return (
    <form className='searchForm' onSubmit={handleSearch}>
      <input
        type='text'
        name='search'
        id='search'
        value={search}
        onChange={(event) =>
          setSearch(event.target.value.toLowerCase().replace(/ /g, ''))
        }
      />
      <div className='searchIcon'>
        <span className='material-icons' style={{ opacity: search ? 0 : 0.3 }}>
          search
        </span>
        <span style={{ opacity: search ? 0 : 0.3 }}>Search</span>
      </div>
      <span
        className='material-icons closeSearch'
        style={{ opacity: search.length === 0 ? 0 : 1 }}
        onClick={handleClose}
        onKeyUp={handleClose}
      >
        close
      </span>
      <button type='submit' style={{ display: 'none' }}>
        Search
      </button>
      {load && (
        <div
          className='spinner-border text-secondary spinner-border-sm loading'
          role='status'
        >
          <span className='visually-hidden'>Loading...</span>
        </div>
      )}
      <div className='users'>
        {search &&
          users.map((user: IUser) => (
            <Link
              key={user._id}
              to={`/profile/${user._id}`}
              onClick={handleClose}
            >
              <UserCard user={user} />
            </Link>
          ))}
      </div>
    </form>
  );
};

export default Search;
