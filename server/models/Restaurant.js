import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  coverImg: { type: String, required: true },
  imgs: [{ type: String, required: true }],
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
});

const restaurantModel = mongoose.model("Restaurant", RestaurantSchema);

export default restaurantModel;
