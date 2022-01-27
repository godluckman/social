import { Response } from 'express';
import CommentModel from '../model/commentModel';
import PostModel from '../model/postModel';

const commentController = {
  createComment: async (req: any, res: Response) => {
    try {
      const { postId, content, tag, reply, postUserId } = req.body;
      // const post = await PostModel.findById(postId);
      // if (!post)
      //   return res.status(400).json({ msg: 'This post does not exist.' });
      // if (reply) {
      //   const cm = await CommentModel.findById(reply);
      //   if (!cm)
      //     return res.status(400).json({ msg: 'This comment does not exist.' });
      // }
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
};

export default commentController;
