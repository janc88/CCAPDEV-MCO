import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  coverImg: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Image",
    required: true,
  },
  imgs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Image",
    required: true,
  }],
  starCount: {
    type: [Number],
    required: true,
    default: [0, 0, 0, 0, 0],
    validate: {
      validator: function (v) {
        return v.length === 5;
      },
    },
  },
  allReviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
  }]
});

const restaurantModel = mongoose.model("Restaurant", RestaurantSchema);

export default restaurantModel;
