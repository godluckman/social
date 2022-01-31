import PostModel from '../model/postModel';

const CommentService = {
  addComment: async (
    _id: string,
    postId: string,
    reply: any,
    content: string,
    tag: any,
    postUserId: string
  ) => {
    const post = await PostModel.findById(postId);
    return post;
  },
};

export default CommentService;
