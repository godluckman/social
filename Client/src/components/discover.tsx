import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IPost } from '../redux/actions/commentAction';

const Discover = () => {
  const { auth, theme, homePosts } = useSelector((state: any) => state);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    setPosts(homePosts.posts);
  }, [auth.token, homePosts.posts]);
  return (
    <div className='post_thumb'>
      {posts.map((post: IPost) => (
        <Link key={post._id} to={`/post/${post._id}`}>
          <div className='post_thumb_display'>
            <img
              src={post.image}
              alt={post.image}
              style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
            />
            <div className='post_thumb_menu'>
              <i className='far fa-heart'>{post.likes.length}</i>
              <i className='far fa-comment'>{post.comments.length}</i>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Discover;
