import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import Avatar from '../../avatar';
import { IState } from '../../profile/Following';
import { allTypes } from '../../../redux/actions/allTypes';
import { deletePost } from '../../../redux/actions/postAction';
import { IPost } from '../../../redux/actions/commentAction';

interface IProp {
  post: IPost;
}

const CardHeader = ({ post }: IProp) => {
  const { auth } = useSelector((state: IState) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleEditPost = () => {
    dispatch({ type: allTypes.STATUS, payload: { ...post, onEdit: true } });
  };
  const handleDeletePost = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(deletePost({ post, auth }));
      navigate('/');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(`http://localhost:3000/post/${post._id}`)
      .then(() =>
        dispatch({
          type: allTypes.ALERT,
          payload: { success: 'Copied to clipboard.' },
        })
      );
  };

  return (
    <div className='card_header'>
      <div className='d-flex'>
        <Link to={`/profile/${post.user._id}`} className='text-dark'>
          <Avatar src={post.user.avatar} size='avatar-medium' />
        </Link>
        <div className='card_name mx-3'>
          <h6 className='m-0'>
            <Link to={`/profile/${post.user._id}`} className='text-dark'>
              {post.user.fullName}
            </Link>
          </h6>
          <small className='text-muted'>
            {moment(post.createdAt).fromNow()}
          </small>
        </div>
      </div>
      <div className='nav-item dropdown'>
        <span
          role='button'
          className='material-icons link-dark'
          id='moreLink'
          data-toggle='dropdown'
          data-bs-toggle='dropdown'
          aria-expanded='false'
        >
          more_horiz
        </span>
        <div className='dropdown-menu'>
          {auth.user._id === post.user._id && (
            <>
              <div
                className='dropdown-item'
                onClick={handleEditPost}
                onKeyUp={handleEditPost}
              >
                <span className='material-icons'>create</span> Edit Post
              </div>
              <div
                className='dropdown-item'
                onClick={handleDeletePost}
                onKeyUp={handleDeletePost}
              >
                <span className='material-icons'>delete_outline</span> Remove
                Post
              </div>
            </>
          )}
          <div
            className='dropdown-item'
            onClick={handleCopyLink}
            onKeyUp={handleCopyLink}
          >
            <span className='material-icons'>content_copy</span> Copy Link
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardHeader;
