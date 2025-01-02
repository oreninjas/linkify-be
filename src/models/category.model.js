import mongoose, { Schema } from 'mongoose';

const categorySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
});

const category = mongoose.model('category', categorySchema);
export default category;
