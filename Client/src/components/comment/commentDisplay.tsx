import React, { useState } from 'react';
import CommentCard from './commentCard';

const CommentDisplay = ({ comment, post }: any) => {
  const [showRep, setShowRep] = useState([]);
  return (
    <div className='comment_display'>
      <CommentCard comment={comment} post={post} commentId={comment._id}>
        <div className='pl-4'>as</div>
      </CommentCard>
    </div>
  );
};

export default CommentDisplay;
