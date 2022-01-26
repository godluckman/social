import React from 'react';
import Status from './Status';
import HPosts from './HPosts';

const Home = () => {
  const a = 'a';
  return (
    <div className='home row mx-0'>
      <div className='col-md-8'>
        <Status />
        <HPosts />
      </div>
      <div className='col-md-4' />
    </div>
  );
};

export default Home;
