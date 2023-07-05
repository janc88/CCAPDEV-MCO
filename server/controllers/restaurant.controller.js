import Restaurant from "../models/Restaurant.js";
import User from "../models/User.js";

const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    console.error('Error getting restaurants:', error);
    res.status(500).json({ message: 'Failed to get restaurants' });
  }
};

const getRestaurantDetails = async (req, res) => {
  const { id } = req.params; 
  try {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    console.error('Error getting restaurant details:', error);
    res.status(500).json({ message: 'Failed to get restaurant details' });
  }
};

const createRestaurant = async (req, res) => {
  try {
    const { name, description, address, coverImg, imgs } = req.body;

    const newRestaurant = new Restaurant({
      name,
      description,
      address,
      coverImg,
      imgs,
    });

    await newRestaurant.save();
    res.status(201).json({ message: "Restaurant created successfully" });
  } catch (error) {
    console.error("Error creating restaurant:", error);
    res.status(500).json({ message: "Failed to create restaurant" });
  }
};

const updateRestaurant = async (req, res) => {};
const deleteRestaurant = async (req, res) => {};

export {
  getAllRestaurants,
  getRestaurantDetails,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
