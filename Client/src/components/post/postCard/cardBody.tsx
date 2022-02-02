import React, { useState } from 'react';

const CardBody = ({ post, theme }: any) => {
  const [readMore, setReadMore] = useState(false);
  return (
    <div className='card_body'>
      <div
        className='card_body-content'
        style={{
          filter: theme ? 'invert(1)' : 'invert(0)',
          color: theme ? 'white' : '#111',
        }}
      >
        <span>
          {post.content.length < 60
            ? post.content
            : readMore
            ? `${post.content} `
            : `${post.content.slice(0, 60)}.....`}
        </span>
        {post.content.length > 60 && (
          <span
            className='readMore'
            onClick={() => setReadMore(!readMore)}
            onKeyUp={() => setReadMore(!readMore)}
          >
            {readMore ? 'Hide content' : 'Read more'}
          </span>
        )}
        <img
          src={post.image}
          alt='post'
          className='carousel-inner rounded img-fluid'
        />
      </div>
    </div>
  );
};

export default CardBody;
