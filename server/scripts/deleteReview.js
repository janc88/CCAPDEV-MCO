const deleteReview = async (req, res) => {
	try {
		const { restoId } = req.params;

		const { userId } = req.body;

		const foundReview = await Review.findById(id);

		if (!foundReview)
			return res.status(404).json({ error: "Review not found" });
		if (foundReview.user.toString() !== userId)
			return res.status(403).json({ error: "User not authorized" });

		const foundResto = await Restaurant.findById(foundReview.restaurant);
		const foundUser = await User.findById(foundReview.user);
		
		const session = await mongoose.startSession();
		session.startTransaction();
		
		await Promise.all(
			foundReview.imgs.map((img) => 
				Image.findByIdAndDelete(img, {session})
			)
		);

		await foundUser.allReviews.pull(foundReview._id);
		await foundUser.save({session});

		await foundResto.allReviews.pull(foundReview._id);
		await foundResto.starCount[foundReview.stars - 1]--;
		await foundResto.save({session});
		await foundReview.deleteOne({session});
		await session.commitTransaction();
		await session.endSession();

		res.status(200).json({ message: "Review deleted" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};