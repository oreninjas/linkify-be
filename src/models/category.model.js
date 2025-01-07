import mongoose, { Schema } from 'mongoose';

const categorySchema = new Schema(
  {
    createdBY: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    category: {
      type: String,
      required: true,
    },
    links: [
      {
        type: Schema.Types.ObjectId,
        ref: 'link',
      },
    ],
  },
  { timestamps: true },
);

const link = mongoose.model('category', categorySchema);
export default link;
