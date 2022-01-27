import React, { useState } from 'react';

const Comments = ({ post }: any) => {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState([]);
  const [next, setNext] = useState(2);
  return (
    <div className='comments'>
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
