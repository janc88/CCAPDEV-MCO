import restojson from './restos.js';
import Restaurant from '../models/Restaurant.js';
import Review from '../models/Review.js';

export default async () => {
	//throw new Error('This script is not meant to be run');
	/*
	WARNING: VERY DANGEROUS SCRIPT THAT DELETES ALL RESTAURANTS AND REVIEWS
	DELETE THIS AFTER DONE IMPLEMENTING REVIEWS	
	ONLY FOR QUICK UPDATING OF RESTAURANTS
	*/
	console.log('Deleting all restaurants and reviews');
	await Restaurant.deleteMany({});
	await Review.deleteMany({});

	const restoList = restojson.map(async (resto) => {
		const details = resto.details;
		const newResto = new Restaurant({
			name: details.name,
			description: details.desc,
			address: details.address,
			coverImg: details.coverImg.src,
			imgs: resto.restoImgs.map(img => img.src),
		});
		console.log('Saving restaurant: ' + details.name);
		await newResto.save();

		

	});
	
	await Restaurant.insertMany(restoList);
	console.log('Restaurants inserted');
	return restoList;
}