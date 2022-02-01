import { Response } from 'express';
import PostService from '../services/postService';
import CommentService from '../services/commentService';

const commentController = {
  addComment: async (req: any, res: Response) => {
    try {
      const { postId, content, tag, reply, postUserId } = req.body;
      const post = await PostService.getPost(postId);
      if (!post)
        return res.status(400).json({ msg: 'This post does not exist.' });
      if (reply) {
        const comment = await CommentService.getComment(reply);
        if (!comment)
          return res.status(400).json({ msg: 'This comment does not exist.' });
      }
      const newComment = await CommentService.addComment(
        req.user._id,
        postId,
        reply,
        content,
        tag,
        postUserId
      );
      res.json({ newComment });
    } catch (err) {
      return res.status(500).json({ msg: (err as Error).message });
    }
    return null;
  },
  updateComment: async (req: any, res: Response) => {
    try {
      const { content } = req.body;
      await CommentService.updateComment(req.params.id, req.user._id, content);
      res.json({ msg: 'Update Success!' });
    } catch (err) {
      return res.status(500).json({ msg: (err as Error).message });
    }
    return null;
  },
  likeComment: async (req: any, res: Response) => {
    try {
      const comment = await CommentService.checkLike(
        req.params.id,
        req.user._id
      );
      if (comment.length > 0)
        return res.status(400).json({ msg: 'You liked this post.' });
      await CommentService.likeComment(req.params.id, req.user._id);
      res.json({ msg: 'Liked Comment!' });
    } catch (err) {
      return res.status(500).json({ msg: (err as Error).message });
    }
    return null;
  },
  unLikeComment: async (req: any, res: Response) => {
    try {
      await CommentService.unLikeComment(req.params.id, req.user._id);
      res.json({ msg: 'UnLiked Comment!' });
    } catch (err) {
      return res.status(500).json({ msg: (err as Error).message });
    }
    return null;
  },
  deleteComment: async (req: any, res: Response) => {
    try {
      await CommentService.deleteComment(req.params.id, req.user._id);
      res.json({ msg: 'Deleted!' });
    } catch (err) {
      return res.status(500).json({ msg: (err as Error).message });
    }
    return null;
  },
};

export default commentController;
