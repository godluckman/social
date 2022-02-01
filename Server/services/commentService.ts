import PostModel from '../model/postModel';
import CommentModel from '../model/commentModel';

const CommentService = {
  addComment: async (
    _id: string,
    postId: string,
    reply: any,
    content: string,
    tag: any,
    postUserId: string
  ) => {
    const newComment = new CommentModel({
      user: _id,
      content,
      tag,
      reply,
      postUserId,
      postId,
    });
    await PostModel.findOneAndUpdate(
      { _id: postId },
      {
        $push: { comments: newComment._id },
      },
      { new: true }
    );
    await newComment.save();
    return newComment;
  },
  getComment: async (id: string) => {
    const comment = await CommentModel.findById(id);
    return comment;
  },
  updateComment: async (id: string, _id: string, content: string) => {
    await CommentModel.findOneAndUpdate(
      {
        _id: id,
        user: _id,
      },
      { content }
    );
  },
  checkLike: async (id: string, _id: string) => {
    const comment = await CommentModel.find({
      _id: id,
      likes: _id,
    });
    return comment;
  },
  likeComment: async (id: string, _id: string) => {
    await CommentModel.findOneAndUpdate(
      { _id: id },
      {
        $push: { likes: _id },
      },
      { new: true }
    );
  },
  unLikeComment: async (id: string, _id: string) => {
    await CommentModel.findOneAndUpdate(
      { _id: id },
      {
        $pull: { likes: _id },
      },
      { new: true }
    );
  },
  deleteComment: async (id: string, _id: string) => {
    const comment = await CommentModel.findOneAndDelete({
      _id: id,
      $or: [{ user: _id }, { postUserId: _id }],
    });
    await PostModel.findOneAndUpdate(
      { _id: comment.postId },
      {
        $pull: { comments: id },
      }
    );
  },
};

export default CommentService;
