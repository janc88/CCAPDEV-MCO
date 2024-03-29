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
    type: {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      body: {
        type: String,
        required: true,
      },
    },
    required: false,
  },
  imgs: [{ type: String, required: false }],
  lastEdited: { type: Date, required: false }
});

ReviewSchema.virtual('votes').get(function () {
	return this.upvotes.length - this.downvotes.length;
});

ReviewSchema.methods.publicView = async function () {
	const user = await User.findById(this.user);
	let response = null;
	if (this.ownerResponse) {
		const owner = await User.findById(this.ownerResponse.user);
		response = {
			owner: await owner.userInfo(),
			body: this.ownerResponse.body
		}
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
		ownerResponse: response,
		imgs: this.imgs.map((img) => `https://ccapdev-mco-backend.onrender.com/api/images/` + img),
		lastEdited: this.lastEdited || null
	  };
};

ReviewSchema.methods.userView = async function (user) {
	const obj = await this.publicView();
	user = new mongoose.Types.ObjectId(user);

	const voteType = 
	this.upvotes.some((upvote) => upvote.equals(user)) ? 'up' : 
	this.downvotes.some((downvote) => downvote.equals(user)) ? 'down' : 'none';
	
	obj.voteType = voteType;
	return obj;
};

const reviewModel = mongoose.model("Review", ReviewSchema);

export default reviewModel;
