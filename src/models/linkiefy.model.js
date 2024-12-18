const { Schema, mongoose } = require('mongoose');

const linkiefyModel = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    description: {
      type: String,
      default:
        'Explore my collection of resources, projects, and useful links. This is where I share the best of what I know and love!',
    },
    linkyImage: {
      type: String,
      required: true,
    },
    categories: [],
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const linkiefy = mongoose.model('linkiefy', linkiefyModel);

export default linkiefy;
