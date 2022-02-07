import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PostCard from './postCard';
import { getPost } from '../../redux/actions/postAction';

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState([]);

  const { auth, detailPost } = useSelector((state: any) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost({ detailPost, id, auth }));

    if (detailPost.length > 0) {
      const newArr = detailPost.filter((pos: any) => pos._id === id);
      setPost(newArr);
    }
  }, [detailPost, dispatch, id, auth]);

  return (
    <div className='posts'>
      {post.length === 0 && (
        <div
          className='spinner-border text-secondary'
          style={{ width: '5rem', height: '5rem' }}
          role='status'
        >
          <span className='visually-hidden'>Loading...</span>
        </div>
      )}

      {post.map((item: any) => (
        <PostCard key={item._id} post={item} />
      ))}
    </div>
  );
};

export default Post;
