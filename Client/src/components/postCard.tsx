import CardHeader from './Home/postCard/cardHeader';
import CardBody from './Home/postCard/cardBody';
import CardFooter from './Home/postCard/cardFooter';
import Comments from './comment/comments';
import InputComment from './comment/inputComment';

const PostCard = ({ post, theme }: any) => (
  <div className='card my-3'>
    <CardHeader post={post} />
    <CardBody post={post} theme={theme} />
    <CardFooter post={post} />
    <Comments post={post} />
    <InputComment post={post} />
  </div>
);

export default PostCard;
