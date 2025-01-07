import mongoose, { Schema } from 'mongoose';

const linkSchema = new Schema({
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
});

const link = mongoose.model('link', linkSchema);
export default link;
