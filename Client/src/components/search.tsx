import React, { useEffect, useState } from 'react';
import { DefaultRootState, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDataApi } from '../redux/utils/fetchData';
import allTypes from '../redux/actions/allTypes';
import UserCard from './userCard';

interface IState extends DefaultRootState {
  auth: { token: string };
}

const Search = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);

  const { auth } = useSelector((state: IState) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (search && auth.token) {
      getDataApi(`search?userName=${search}`, auth.token)
        .then((res) => setUsers(res.data.users))
        .catch((err) => {
          dispatch({
            type: allTypes.ALERT,
            payload: { error: err.response.data.msg },
          });
        });
    }
  }, [search, auth.token, dispatch]);
  return (
    <form className='searchForm'>
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
        style={{ opacity: users.length === 0 ? 0 : 1 }}
      >
        close
      </span>
      <div className='users'>
        {users.map((user: any) => (
          <Link key={user._id} to={`/profile/${user._id}`}>
            <UserCard />
          </Link>
        ))}
      </div>
    </form>
  );
};

export default Search;
