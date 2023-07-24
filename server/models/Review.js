import mongoose from "mongoose";
import User from "./User.js";
import Restaurant from "./Restaurant.js";

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
  stars: { 
	type: Number, 
	required: true,
	min: 1,
	max: 5
 },
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
  ownerResponse: { 
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: false
	},
	body: {
		type: String,
		required: false
	}
  },
  imgs: [{ type: String, required: false }],
  lastEdited: { type: Date, required: false }
});

ReviewSchema.virtual('votes').get(function () {
	return this.upvotes.length - this.downvotes.length;
});

ReviewSchema.methods.publicView = async function () {
	const user = await User.findById(this.user);
	const ownerResponse = this.ownerResponse;
	if (ownerResponse && ownerResponse.user) {
		ownerResponse.user = await User.findById(ownerResponse.user);
	}
	const resto = await Restaurant.findById(this.restaurant);
	return {
		id: this._id,
		title: this.title,
		body: this.body,
		datePosted: this.datePosted,
		user: await user.userInfo(),
		restaurant: await resto.publicView(),
		stars: this.stars,
		votes: this.votes,
		ownerResponse: ownerResponse,
		imgs: this.imgs.map((img) => 'http://localhost:8080/api/images/' + img),
		lastEdited: this.lastEdited || null
	  };
};

ReviewSchema.methods.userView = async function (user) {
	const obj = await this.publicView();
	const voteType = 
		this.upvotes.includes(user) ? 'upvote' : 
		this.downvotes.includes(user) ? 'downvote' : 'none';
	obj.voteType = voteType;
	return obj;
};

const reviewModel = mongoose.model("Review", ReviewSchema);

export default reviewModel;
