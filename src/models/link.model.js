import mongoose, { Schema } from 'mongoose';

const linkSchema = new Schema(
  {
    createdBY: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    category: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const link = mongoose.model('link', linkSchema);
export default link;
