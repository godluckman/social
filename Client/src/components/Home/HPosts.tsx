import React from 'react';
import { DefaultRootState, useSelector } from 'react-redux';
import { IUser } from '../../redux/actions/profileAction';
import CardHeader from './postCard/cardHeader';
import CardBody from './postCard/cardBody';
import CardFooter from './postCard/cardFooter';

interface IState extends DefaultRootState {
  homePosts: { loading: boolean; result: number; page: number; posts: any[] };
  auth: { token: string; user: IUser };
  theme: boolean;
}

const HPosts = () => {
  const { homePosts, auth, theme } = useSelector((state: IState) => state);
  return (
    <div className='posts'>
      {homePosts.posts.map((post) => (
        <div className='card my-3' key={post._id}>
          <CardHeader post={post} />
          <CardBody post={post} theme={theme} />
          <CardFooter post={post} />
        </div>
      ))}
    </div>
  );
};

export default HPosts;
