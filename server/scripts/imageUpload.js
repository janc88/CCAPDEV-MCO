import { restoList as oldRestoList } from "./data.js";
import fs from "fs";
import Image from "../models/Image.js";

function getAllFolders(path) {
	return fs.readdirSync(path, { withFileTypes: true })
		.filter(item => item.isDirectory())
		.map(item => item.name);
}
function getAllFiles(path) {
	return fs.readdirSync(path, { withFileTypes: true })
		.filter(item => item.isFile());
}

export default async function imageUpload() {
	const deleteResult = await Image.deleteMany({ name: { $regex: '^Screenshot' } });
	console.log(`deleted ${deleteResult.deletedCount} images`);

	const restoList = JSON.parse(JSON.stringify(oldRestoList));
	const dataFolder = './scripts/Website Restaurant Pics';
	for (const restoFolder of getAllFolders(dataFolder)) {
		console.log(`reading ${restoFolder}`);

		const picsPath = `${dataFolder}/${restoFolder}/resto-pics/`;
		const picsIds = [];

		for (const file of getAllFiles(picsPath)) {
			const newImage = new Image({
				name: file.name,
				data: fs.readFileSync(`${picsPath}/${file.name}`),
				mimeType: "image/png", //assume correct
			});
			await newImage.save();
			picsIds.push(newImage._id);
		}

		const reviewsPath = `${dataFolder}/${restoFolder}/review-pics/`;
		const reviewIds = [];

		for (const file of getAllFiles(reviewsPath)) {
			const newImage = new Image({
				name: file.name,
				data: fs.readFileSync(`${reviewsPath}/${file.name}`),
				mimeType: "image/png", //assume correct
			});
			await newImage.save();
			reviewIds.push(newImage._id);
		}

		const resto = restoList.find(resto => resto.details.name === restoFolder);

		resto.restoImgs = picsIds.map((id, ind) => {
			return {
				id: ind,
				src: id,
				alt: `Image ${ind}`
			}
		});
		for (const review of resto.reviews)
			review.imgs = reviewIds.map((id, ind) => {
				return {
					id: ind,
					src: id,
					alt: `Image ${ind}`
				}
			});
	}
    fs.writeFileSync(`${dataFolder}/output.json`, JSON.stringify(restoList));
};