import { Schema, mongoose } from 'mongoose';

const linkifyModel = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    title: {
      type: String,
      required: true,
    },
    linkyImage: {
      type: String,
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'link',
      },
    ],
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const linkify = mongoose.model('linkify', linkifyModel);

export default linkify;
