import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../profile/Following';

const CommentMenu = ({ post, comment, setOnEdit }: any) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state: IState) => state);
  const handleRemove = () => {
    if (post.user._id === auth.user._id || comment.user._id === auth.user._id) {
      // dispatch(deleteComment({post, auth, comment}))
    }
  };
  // eslint-disable-next-line react/no-unstable-nested-components
  const MenuItem = () => (
    <>
      <div
        className='dropdown-item'
        onClick={() => setOnEdit(true)}
        onKeyUp={() => setOnEdit(true)}
      >
        <span className='material-icons'>create</span> Edit
      </div>
      <div
        className='dropdown-item'
        onClick={handleRemove}
        onKeyUp={handleRemove}
      >
        <span className='material-icons'>delete_outline</span> Remove
      </div>
    </>
  );

  return (
    <div className='menu'>
      {(post.user._id === auth.user._id ||
        comment.user._id === auth.user._id) && (
        <div className='nav-item dropdown'>
          <span
            className='material-icons'
            id='moreLink'
            data-bs-toggle='dropdown'
            aria-expanded='false'
          >
            more_vert
          </span>

          <div className='dropdown-menu' aria-labelledby='moreLink'>
            {post.user._id === auth.user._id ? (
              comment.user._id === auth.user._id ? (
                MenuItem()
              ) : (
                <div
                  className='dropdown-item'
                  onClick={handleRemove}
                  onKeyUp={handleRemove}
                >
                  <span className='material-icons'>delete_outline</span> Remove
                </div>
              )
            ) : (
              comment.user._id === auth.user._id && MenuItem()
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentMenu;
