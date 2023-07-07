import express from 'express';
import {
	createImage,
	getImage,
	deleteImage,
} from '../controllers/image.controller.js';

const router = express.Router();

router.route("/:id").get(getImage);
router.route("/").post(createImage);
router.route("/:id").delete(deleteImage);

export default router;