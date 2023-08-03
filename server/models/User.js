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
  ownedRestaurant: {
	type: mongoose.Schema.Types.ObjectId,
	ref: "Restaurant",
	required: false
  }
});

UserSchema.methods.userInfo = function () {
	return {
		id: this._id,
		username: this.username,
		description: this.description,
		avatar: `https://ccapdev-mco-backend.onrender.com/api/images/` + this.avatar,
		ownedRestoId: this.ownedRestaurant || null
	};
};

const userModel = mongoose.model("User", UserSchema);

export default userModel;
