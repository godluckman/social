import { Response } from 'express';
import CommentModel from '../model/commentModel';
import PostModel from '../model/postModel';

const commentController = {
  addComment: async (req: any, res: Response) => {
    try {
      const { postId, content, tag, reply, postUserId } = req.body;
      const post = await PostModel.findById(postId);
      if (!post)
        return res.status(400).json({ msg: 'This post does not exist.' });
      if (reply) {
        const cm = await CommentModel.findById(reply);
        if (!cm)
          return res.status(400).json({ msg: 'This comment does not exist.' });
      }
      const newComment = new CommentModel({
        user: req.user._id,
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
      res.json({ newComment });
    } catch (err) {
      return res.status(500).json({ msg: (err as Error).message });
    }
    return null;
  },
  updateComment: async (req: any, res: Response) => {
    try {
      const { content } = req.body;

      await CommentModel.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user._id,
        },
        { content }
      );

      res.json({ msg: 'Update Success!' });
    } catch (err) {
      return res.status(500).json({ msg: (err as Error).message });
    }
    return null;
  },
  likeComment: async (req: any, res: Response) => {
    try {
      const comment = await CommentModel.find({
        _id: req.params.id,
        likes: req.user._id,
      });
      if (comment.length > 0)
        return res.status(400).json({ msg: 'You liked this post.' });

      await CommentModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { likes: req.user._id },
        },
        { new: true }
      );

      res.json({ msg: 'Liked Comment!' });
    } catch (err) {
      return res.status(500).json({ msg: (err as Error).message });
    }
    return null;
  },
  unLikeComment: async (req: any, res: Response) => {
    try {
      await CommentModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { likes: req.user._id },
        },
        { new: true }
      );

      res.json({ msg: 'UnLiked Comment!' });
    } catch (err) {
      return res.status(500).json({ msg: (err as Error).message });
    }
    return null;
  },
  deleteComment: async (req: any, res: Response) => {
    try {
      const comment = await CommentModel.findOneAndDelete({
        _id: req.params.id,
        $or: [{ user: req.user._id }, { postUserId: req.user._id }],
      });

      await PostModel.findOneAndUpdate(
        { _id: comment.postId },
        {
          $pull: { comments: req.params.id },
        }
      );

      res.json({ msg: 'Deleted!' });
    } catch (err) {
      return res.status(500).json({ msg: (err as Error).message });
    }
    return null;
  },
};

export default commentController;
