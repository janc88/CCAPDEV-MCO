import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  coverImg: { type: String, required: true },
  imgs: [{ type: String, required: true }],
  allReviews: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
  },
});

const restaurantModel = mongoose.model("Restaurant", RestaurantSchema);

export default restaurantModel;