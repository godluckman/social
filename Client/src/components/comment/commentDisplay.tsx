import React, { useEffect, useState } from 'react';
import CommentCard from './commentCard';
import { IComment, IPost } from '../../redux/actions/commentAction';

interface Props {
  comment: IComment;
  post: IPost;
  replyCm: IComment[];
}

const CommentDisplay = ({ comment, post, replyCm }: Props) => {
  const [showRep, setShowRep] = useState<IComment[]>([]);
  const [next, setNext] = useState(1);
  useEffect(() => {
    setShowRep(replyCm.slice(replyCm.length - next));
  }, [replyCm, next]);
  return (
    <div className='comment_display'>
      <CommentCard comment={comment} post={post} commentId={comment._id}>
        <div className='ps-4'>
          {showRep.map(
            (item) =>
              item.reply && (
                <CommentCard
                  key={item.createdAt}
                  comment={item}
                  post={post}
                  commentId={comment._id}
                />
              )
          )}
          {replyCm.length - next > 0 ? (
            <div
              style={{ cursor: 'pointer', color: 'crimson' }}
              onClick={() => setNext(next + 10)}
              onKeyUp={() => setNext(next + 10)}
            >
              See more comments...
            </div>
          ) : (
            replyCm.length > 1 && (
              <div
                style={{ cursor: 'pointer', color: 'crimson' }}
                onClick={() => setNext(1)}
                onKeyUp={() => setNext(1)}
              >
                Hide comments...
              </div>
            )
          )}
        </div>
      </CommentCard>
    </div>
  );
};

export default CommentDisplay;
