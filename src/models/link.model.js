import mongoose, { Schema } from 'mongoose';

const linkSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category',
  },
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
});

const link = mongoose.model('link', linkSchema);
export default link;
