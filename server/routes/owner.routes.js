import express from "express";

import {
	replyToReview,
} from "../controllers/owner.controller.js";

const router = express.Router();

router.route("/reply/:id").post(replyToReview);


export default router;
