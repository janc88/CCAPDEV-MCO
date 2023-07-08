import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  description: { type: String },
  password: { type: String, required: true },
  avatar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Image",
    required: true,
  },
  allReviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

const userModel = mongoose.model("User", UserSchema);

export default userModel;
