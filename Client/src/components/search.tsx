import React, { useState } from 'react';
import { DefaultRootState, useDispatch, useSelector } from 'react-redux';

interface IState extends DefaultRootState {
  auth: { token: string };
}

const Search = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);

  const { auth } = useSelector((state: IState) => state);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  console.log(auth, dispatch, load, setLoad, setUsers);
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
    </form>
  );
};

export default Search;
