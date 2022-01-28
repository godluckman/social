import React, { useEffect, useState } from 'react';
import { IComment, IPost } from '../../redux/actions/commentAction';
import CommentDisplay from './commentDisplay';

interface IPostProp {
  post: IPost;
}

const Comments = ({ post }: IPostProp) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [showComments, setShowComments] = useState<IComment[]>([]);
  const [next, setNext] = useState(2);
  useEffect(() => {
    const newCm = post.comments.filter((cm) => !cm.reply);
    setComments(newCm);
    setShowComments(newCm.slice(newCm.length - next));
  }, [post.comments, next]);
  return (
    <div className='comments'>
      {showComments.map((comment) => (
        <CommentDisplay key={comment._id} comment={comment} post={post} />
      ))}
      {comments.length - next > 0 ? (
        <div
          className='p-2 border-top'
          style={{ cursor: 'pointer', color: 'crimson' }}
          onClick={() => setNext(next + 10)}
          onKeyUp={() => setNext(next + 10)}
        >
          See more comments...
        </div>
      ) : (
        comments.length > 2 && (
          <div
            className='p-2 border-top'
            style={{ cursor: 'pointer', color: 'crimson' }}
            onClick={() => setNext(2)}
            onKeyUp={() => setNext(2)}
          >
            Hide comments...
          </div>
        )
      )}
    </div>
  );
};

export default Comments;
