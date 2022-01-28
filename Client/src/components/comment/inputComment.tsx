import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IStateAT } from '../Home/postCard/cardFooter';
import { createComment } from '../../redux/actions/commentAction';

const InputComment = ({ children, post, onReply, setOnReply }: any) => {
  const [content, setContent] = useState('');
  const { auth, theme } = useSelector((state: IStateAT) => state);
  const dispatch = useDispatch();
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      if (setOnReply) return setOnReply(false);
      return null;
    }

    setContent('');

    const newComment = {
      content,
      likes: [],
      user: auth.user,
      createdAt: new Date().toISOString(),
      reply: onReply && onReply.commentId,
      tag: onReply && onReply.user,
    };

    dispatch(createComment({ post, newComment, auth }));

    if (setOnReply) return setOnReply(false);
    return null;
  };

  return (
    <form className='card-footer comment_input' onSubmit={handleSubmit}>
      {children}
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
