import Restaurant from '../models/Restaurant.js';
import User from '../models/User.js';
import Image from '../models/Image.js';

export const createRestoOwner = async (resto) => {
	console.log('creating owner for ' + resto.name)
	const img = await Image.findById(resto.coverImg);
	const avatar = new Image({
		name: resto.name + " avatar",
		data: img.data,
		mimeType: img.mimeType,
	});
	await avatar.save();
	await User.findOneAndDelete({ username: resto.name + " owner" })
	const owner = new User({
		username: resto.name + " owner",
		description: resto.description,
		password: "12345678",
		avatar: avatar._id,
		ownedRestaurant: resto._id,
	});
	await owner.save();
	console.log('owner saved ' + owner.username)
};