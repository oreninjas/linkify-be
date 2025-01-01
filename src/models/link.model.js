import mongoose, { Schema } from 'mongoose';

const linkSchema = new Schema({
  logo: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category',
  },
});

const link = mongoose.model('link', linkSchema);
export default link;
