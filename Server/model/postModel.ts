import pkg from 'mongoose';

const { Schema, model, Types } = pkg;

const postSchema = new Schema(
  {
    content: String,
    images: {
      type: Array,
      required: true,
    },
    likes: [{ type: Types.ObjectId, ref: 'user' }],
    comments: [{ type: Types.ObjectId, ref: 'comment' }],
    user: { type: Types.ObjectId, ref: 'user' },
  },
  {
    collection: 'post',
    timestamps: true,
  }
);

export default model('post', postSchema, 'post');
