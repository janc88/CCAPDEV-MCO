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

RestaurantSchema.methods.publicView = async function () {
	const count = this.starCount.reduce((acc, cur) => acc + cur, 0);
	const avg = this.starCount.reduce(
		(acc, cur, idx) => acc + cur * (idx + 1),
	0) / count;
	return {
		id: this._id,
		name: this.name,
		description: this.description,
		address: this.address,
		coverImg: 'http://localhost:8080/api/images/' + this.coverImg,
		imgs: this.imgs.map((img) => 'http://localhost:8080/api/images/' + img),
		starCount: this.starCount,
		totalRatings: count,
		averageRating: avg.toFixed(2),
	};
};


const restaurantModel = mongoose.model("Restaurant", RestaurantSchema);

export default restaurantModel;
