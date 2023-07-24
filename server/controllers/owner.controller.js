import User from '../models/User.js';
import Review from '../models/Review.js';

export const replyToReview = async (req, res) => {
	const { id } = req.params;
	const { userId, body } = req.body;

	const foundReview = await Review.findById(id);
	if (!foundReview) 
		return res.status(404).json({ message: "Review not found" });
	if (foundReview.ownerReply)
		return res.status(400).json({ message: "Reply already exists" });

	const foundUser = await User.findById(userId);
	if (!foundUser)
		return res.status(404).json({ message: "User not found" });
	if (!foundUser.ownedRestaurant)
		return res.status(401).json({ message: "Not an owner" });
	if (foundUser.ownedRestaurant.toString() !== foundReview.restaurant.toString())
		return res.status(401).json({ message: "Not an owner" });
	
	foundReview.ownerResponse = {
		user: userId,
		body,
	};
	await foundReview.save();
	return res.status(200).json(foundReview);
};