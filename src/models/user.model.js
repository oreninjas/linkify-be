import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    email: {
      type: String,
      minlength: 8,
      required: true,
    },
    password: {
      type: String,
      minlength: 8,
    },
    profilePicture: {
      type: String,
      default: '',
    },
    linkies: {
      // FK
      type: Schema.Types.ObjectId,
      ref: 'linkiefy',
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const user = mongoose.model('user', userSchema);
