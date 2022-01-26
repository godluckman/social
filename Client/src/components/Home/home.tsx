import React from 'react';
import { DefaultRootState, useSelector } from 'react-redux';
import Status from './Status';
import HPosts from './HPosts';

interface IState extends DefaultRootState {
  homePosts: { loading: boolean; result: number; page: number; posts: any[] };
}

const Home = () => {
  const { homePosts } = useSelector((state: IState) => state);
  return (
    <div className='home row mx-0'>
      <div className='col-md-8'>
        <Status />
        {/* eslint-disable-next-line no-nested-ternary */}
        {homePosts.loading ? (
          <div className='text-center'>
            <div
              className='spinner-border text-secondary'
              style={{ width: '5rem', height: '5rem' }}
              role='status'
            >
              <span className='visually-hidden'>Loading...</span>
            </div>
          </div>
        ) : homePosts.result === 0 && homePosts.posts.length === 0 ? (
          <h2 className='text-center'>No Post</h2>
        ) : (
          <HPosts />
        )}
      </div>
      <div className='col-md-4' />
    </div>
  );
};

export default Home;
