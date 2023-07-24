import Restaurant from "../models/Restaurant.js";
import User from "../models/User.js";
import Image from "../models/Image.js";

const getAllRestaurants = async (req, res) => {
  res.status(501).send('Not Implemented');
};
const getFeaturedRestaurants = async (req, res) => {
	try {
		let restaurants = await Restaurant.find({}).limit(10);
		restaurants = await Promise.all(
			restaurants.map(resto => resto.publicView())
		);
		res.status(200).json(restaurants);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}
const getRestaurantDetails = async (req, res) => {
  try {
	const { id } = req.params;

	const restaurant = await Restaurant.findById(id);

	if (!restaurant) {
		return res.status(404).json({ error: "Restaurant not found" });
	}

	res.status(200).json(await restaurant.publicView());
  } catch (error) {
	res.status(500).json({ error: error.message });
  }
};

const createRestaurant = async (req, res) => {
  try {
	const { 
		name, 
		description, 
		address,
	} = req.body;
	const coverImg = req.file;
	const imgs = req.files;

	if (await Restaurant.findOne({ name })) {
		return res.status(409).json({ error: "Restaurant already exists" });
	}

	const session = await mongoose.startSession();
	session.startTransaction();

	const newCoverImg = await Image.uploadImage(coverImg, session);
	const newImgs = await Promise.all(
		imgs.map(img => Image.uploadImage(img, session))
	);

	const newRestaurant = new Restaurant({
		name,
		description,
		address,
		coverImg: newCoverImg._id,
		imgs: newImgs.map(img => img._id),
	});
	await newRestaurant.save({session});
	await session.commitTransaction();
	session.endSession();

	res.status(201).json(await newRestaurant.publicView());
  } catch (error) {
	res.status(500).json({ error: error.message });
  }
};
const updateRestaurant = async (req, res) => {
  res.status(501).send('Not Implemented');
};
const deleteRestaurant = async (req, res) => {
  res.status(501).send('Not Implemented');
};

export {
  getAllRestaurants,
  getRestaurantDetails,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getFeaturedRestaurants,
};
