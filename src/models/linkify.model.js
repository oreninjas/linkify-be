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
    description: {
      type: String,
      default:
        'Explore my collection of resources, projects, and useful links. This is where I share the best of what I know and love!',
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
