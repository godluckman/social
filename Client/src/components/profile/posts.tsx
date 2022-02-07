import React, { useEffect, useState } from 'react';
import PostMiniCard from '../post/postMiniCard';

const Posts = ({ profile, id }: any) => {
  const [posts, setPosts] = useState([]);
  const [result, setResult] = useState(9);
  const [page, setPage] = useState(0);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    profile.posts.forEach((data: any) => {
      if (data._id === id) {
        setPosts(data.posts);
        setResult(data.result);
        setPage(data.page);
      }
    });
  }, [profile.posts, id]);
  return (
    <div>
      <PostMiniCard posts={posts} result={result} />
      {load && (
        <div
          className='spinner-border text-secondary'
          style={{ width: '5rem', height: '5rem' }}
          role='status'
        >
          <span className='visually-hidden'>Loading...</span>
        </div>
      )}
    </div>
  );
};

export default Posts;
