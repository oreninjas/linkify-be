import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: '',
    },
    // linkies: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'linkify',
    //   },
    // ], i'll implement later on :/
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const user = mongoose.model('user', userSchema);

export default user;
