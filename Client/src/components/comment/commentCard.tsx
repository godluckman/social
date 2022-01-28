import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Avatar from '../avatar';
import { IStateAT } from '../Home/postCard/cardFooter';
import { LikeButton } from '../likeButton';
import CommentMenu from './commentMenu';
import {
  likeComment,
  unLikeComment,
  updateComment,
} from '../../redux/actions/commentAction';

const CommentCard = ({ children, comment, post, commentId }: any) => {
  const dispatch = useDispatch();
  const { auth, theme } = useSelector((state: IStateAT) => state);
  const [content, setContent] = useState('');
  const [readMore, setReadMore] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);
  const [onReply, setOnReply] = useState(false);

  useEffect(() => {
    setContent(comment.content);
    setIsLike(false);
    setOnReply(false);
    if (comment.likes.find((like: any) => like._id === auth.user._id)) {
      setIsLike(true);
    }
  }, [comment, auth.user._id]);

  const handleUpdate = () => {
    if (comment.content !== content) {
      dispatch(updateComment({ comment, post, content, auth }));
      setOnEdit(false);
    } else {
      setOnEdit(false);
    }
  };

  const handleReply = () => {
    if (onReply) return setOnReply(false);
    setOnReply({ ...comment, commentId });
    return null;
  };

  const handleLike = async () => {
    if (loadLike) return;
    setIsLike(true);

    setLoadLike(true);
    await dispatch(likeComment({ comment, post, auth }));
    setLoadLike(false);
  };

  const handleUnLike = async () => {
    if (loadLike) return;
    setIsLike(false);

    setLoadLike(true);
    await dispatch(unLikeComment({ comment, post, auth }));
    setLoadLike(false);
  };

  return (
    <div
      className='comment_card mt-2'
      style={{
        opacity: comment._id ? 1 : 0.5,
        pointerEvents: comment._id ? 'inherit' : 'none',
      }}
    >
      <Link to={`/profile/${comment.user._id}`} className='d-flex text-dark'>
        <Avatar src={comment.user.avatar} size='avatar' />
        <h6 className='mx-1'>{comment.user.userName}</h6>
      </Link>
      <div className='comment_content'>
        <div
          className='flex-fill'
          style={{
            filter: theme ? 'invert(1)' : 'invert(0)',
            color: theme ? 'white' : '#111',
          }}
        >
          {' '}
          {onEdit ? (
            <textarea
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          ) : (
            <div>
              {comment.tag && comment.tag._id !== comment.user._id && (
                <Link to={`/profile/${comment.tag._id}`} className='mr-1'>
                  @{comment.tag.username}
                </Link>
              )}
              <span>
                {content.length < 100
                  ? content
                  : readMore
                  ? `${content} `
                  : `${content.slice(0, 100)}....`}
              </span>
              {content.length > 100 && (
                <span
                  className='readMore'
                  onClick={() => setReadMore(!readMore)}
                  onKeyUp={() => setReadMore(!readMore)}
                >
                  {readMore ? 'Hide content' : 'Read more'}
                </span>
              )}
            </div>
          )}
          <div style={{ cursor: 'pointer' }}>
            <small className='text-muted me-3'>
              {moment(comment.createdAt).fromNow()}
            </small>

            <small className='font-weight-bold me-3'>
              {comment.likes.length} likes
            </small>

            {onEdit ? (
              <>
                <small
                  className='font-weight-bold me-3'
                  onClick={handleUpdate}
                  onKeyUp={handleUpdate}
                >
                  update
                </small>
                <small
                  className='font-weight-bold me-3'
                  onClick={() => setOnEdit(false)}
                  onKeyUp={() => setOnEdit(false)}
                >
                  cancel
                </small>
              </>
            ) : (
              <small
                className='font-weight-bold me-3'
                onClick={handleReply}
                onKeyUp={handleReply}
              >
                {onReply ? 'cancel' : 'reply'}
              </small>
            )}
          </div>
        </div>
        <div
          className='d-flex align-items-center mx-2'
          style={{ cursor: 'pointer' }}
        >
          <CommentMenu post={post} comment={comment} setOnEdit={setOnEdit} />
          <LikeButton
            isLike={isLike}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
          />
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
