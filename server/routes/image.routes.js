import express from 'express';
import {
	getImage,
} from '../controllers/image.controller.js';

const router = express.Router();

router.route("/:id").get(getImage);

export default router;