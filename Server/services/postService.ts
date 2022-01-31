import PostModel from '../model/postModel';
import CommentModel from '../model/commentModel';

const PostService = {
  addPost: async (content: string, image: string, id: string) => {
    const newPost = await new PostModel({
      content,
      image,
      user: id,
    });
    await newPost.save();
    return newPost;
  },
  getPosts: async (following: any, id: string) => {
    const posts = await PostModel.find({
      user: [...following, id],
    })
      .sort('-createdAt')
      .populate('user likes', 'avatar username fullName followers')
      .populate({
        path: 'comments',
        populate: {
          path: 'user likes',
          select: '-password',
        },
      });
    return posts;
  },
  updatePost: async (id: string, content: string, image: string) => {
    const post = await PostModel.findOneAndUpdate(
      { _id: id },
      {
        content,
        image,
      }
    )
      .populate('user likes', 'avatar username fullName')
      .populate({
        path: 'comments',
        populate: {
          path: 'user likes',
          select: '-password',
        },
      });
    return post;
  },
  likePost: async (id: string, _id: string) => {
    const post = await PostModel.find({
      _id: id,
      likes: _id,
    });
    const like = await PostModel.findOneAndUpdate(
      { _id: id },
      {
        $push: { likes: _id },
      },
      { new: true }
    );
    return { post, like };
  },
  unLikePost: async (id: string, _id: string) => {
    const like = await PostModel.findOneAndUpdate(
      { _id: id },
      {
        $pull: { likes: _id },
      },
      { new: true }
    );

    return like;
  },
  getUserPosts: async (id: string) => {
    const posts = await PostModel.find({ user: id }).sort('-createdAt');
    return posts;
  },
  getPost: async (id: string) => {
    const post = await PostModel.findById(id)
      .populate('user likes', 'avatar username fullName followers')
      .populate({
        path: 'comments',
        populate: {
          path: 'user likes',
          select: '-password',
        },
      });
    return post;
  },
  deletePost: async (id: string, _id: string) => {
    const post = await PostModel.findOneAndDelete({
      _id: id,
      user: _id,
    });
    await CommentModel.deleteMany({ _id: { $in: post.comments } });
    return post;
  },
};

export default PostService;
