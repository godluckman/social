import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IStateAT } from '../Home/postCard/cardFooter';

const InputComment = ({ post }: any) => {
  const [content, setContent] = useState('');
  const { auth, theme } = useSelector((state: IStateAT) => state);
  const dispatch = useDispatch();

  return (
    <form className='card-footer comment_input'>
      <input
        type='text'
        placeholder='Add your comments...'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{
          filter: theme ? 'invert(1)' : 'invert(0)',
          color: theme ? 'white' : '#111',
          background: theme ? 'rgba(0,0,0,.03)' : '',
        }}
      />

      <button type='submit' className='postBtn'>
        Post
      </button>
    </form>
  );
};

export default InputComment;
