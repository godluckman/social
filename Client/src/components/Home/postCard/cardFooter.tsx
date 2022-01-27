import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IState } from '../../profile/Following';
import { LikeButton } from '../../likeButton';
import { likePost, unLikePost } from '../../../redux/actions/postAction';

export interface IStateAT extends IState {
  theme: boolean;
}

const CardFooter = ({ post }: any) => {
  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);
  const { auth, theme } = useSelector((state: IStateAT) => state);
  const dispatch = useDispatch();

  const handleLike = async () => {
    if (loadLike) return;
    setIsLike(true);
    setLoadLike(true);
    await dispatch(likePost({ post, auth }));
    setLoadLike(false);
  };

  const handleUnLike = async () => {
    if (loadLike) return;
    setIsLike(false);
    setLoadLike(true);
    await dispatch(unLikePost({ post, auth }));
    setLoadLike(false);
  };

  useEffect(() => {
    if (post.likes.find((like: any) => like._id === auth.user._id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [post.likes, auth.user._id]);

  return (
    <div className='card_footer'>
      <div className='card_icon_menu'>
        <LikeButton
          isLike={isLike}
          handleLike={handleLike}
          handleUnLike={handleUnLike}
        />
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
