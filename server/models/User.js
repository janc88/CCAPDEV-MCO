import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: true },
    allReviews: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
    },
  },
  {
    _id: false,
  }
);

const userModel = mongoose.model("User", UserSchema);

export default userModel;
