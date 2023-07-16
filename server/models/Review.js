import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  datePosted: { type: Date, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  stars: { type: Number, required: true },
  upvotes: [{
	type: mongoose.Schema.Types.ObjectId,
	ref: 'User',
	required: false
  }],
  downvotes: [{
	type: mongoose.Schema.Types.ObjectId,
	ref: 'User',
	required: false
  }],
  ownerResponse: { type: Number, required: false },
  imgs: [{ type: String, required: false }],
});

const reviewModel = mongoose.model("Review", ReviewSchema);

export default reviewModel;
