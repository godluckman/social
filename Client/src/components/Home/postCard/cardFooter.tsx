import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IState } from '../../profile/Following';

export interface IStateAT extends IState {
  theme: boolean;
}

const CardFooter = ({ post }: any) => {
  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);
  const { auth, theme } = useSelector((state: IStateAT) => state);

  return (
    <div className='card_footer'>
      <div className='card_icon_menu'>
        <div>
          <span className='material-icons'>favorite_border</span>
          <span className='material-icons'>bookmark_border</span>
          <Link to={`/post/${post._id}`} className='text-dark m-0'>
            <i className='far fa-comment' style={{ fontSize: '24px' }} />
          </Link>
        </div>
      </div>
      <div className='d-flex justify-content-between'>
        <h6 style={{ padding: '0 25px', cursor: 'pointer' }}>
          {post.likes.length} likes
        </h6>

        <h6 style={{ padding: '0 25px', cursor: 'pointer' }}>
          {post.comments.length} comments
        </h6>
      </div>
    </div>
  );
};

export default CardFooter;
