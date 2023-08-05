import mongoose from "mongoose";
import User from "./User.js";

const SessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  expiration: { type: Date, required: true },
  createdAt: { type: Date, required: true },
  rememberMe: { type: Boolean, required: true },
});

// in days
SessionSchema.virtual("duration").get(function () {
	return (this.expiration - this.createdAt) / (24 * 60 * 60 * 1000);
});
SessionSchema.virtual("user").get(async function () {
	const user = await User.findById(this.userId);
	return user;
});

//create new session
SessionSchema.statics.create = async function (user, rememberMe, duration = 30) {
  const session = new this({
	userId: user._id,
	createdAt: new Date(),
	rememberMe: rememberMe,
	expiration: new Date(Date.now() + duration * 24 * 60 * 60 * 1000), // days
  });
  await session.save();
  return session;
};

//set expiration date
SessionSchema.methods.setExpiration = async function (duration = 30) {
  this.expiration = new Date(Date.now() + duration * 24 * 60 * 60 * 1000); // days
  await this.save();
}

//extend session
SessionSchema.methods.extendExpiration = async function (duration = 30) {
  this.expiration = new Date(Date.now() + duration * 24 * 60 * 60 * 1000); // days
  await this.save();
};

SessionSchema.methods.isExpired = function () {
	return this.expiration < new Date();
};

const sessionModel = mongoose.model("Session", SessionSchema);

export default sessionModel;