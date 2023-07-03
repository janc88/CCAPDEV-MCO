import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  datePosted: { type: Date, required: true },
  stars: { type: Number, required: true },
  helpful: { type: Number, required: true },
  ownerResponse: { type: Number, required: true },
  imgs: [{ type: String, required: true }],
});

const reviewModel = mongoose.model("Review", ReviewSchema);

export default reviewModel;
