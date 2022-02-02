import React from 'react';
import { DefaultRootState, useSelector } from 'react-redux';
import { IUser } from '../../redux/actions/profileAction';
import PostCard from '../postCard';

interface IState extends DefaultRootState {
  homePosts: { loading: boolean; result: number; page: number; posts: any[] };
  auth: { token: string; user: IUser };
  theme: boolean;
}

const HomePosts = () => {
  const { homePosts, auth, theme } = useSelector((state: IState) => state);
  return (
    <div className='posts'>
      {homePosts.posts.map((post) => (
        <PostCard key={post._id} post={post} theme={theme} />
      ))}
    </div>
  );
};

export default HomePosts;
