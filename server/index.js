import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import userRouter from "./routes/user.routes.js";
import reviewRouter from "./routes/review.routes.js";
import restaurantRouter from "./routes/restaurant.routes.js";
import imageRouter from "./routes/image.routes.js";
import ownerRouter from "./routes/owner.routes.js";
import session from "./controllers/session.controller.js";


dotenv.config();

const app = express();
app.use(cors({
	origin: true,
	credentials: true,
}));
app.use(express.json({ limit: "50mb" }));

app.get("/", async (req, res) => {
	res.send({ 
		message: "Hello World!",
	});
});

app.use(session);
app.use("/api/users", userRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/restaurants", restaurantRouter);
app.use("/api/images", imageRouter);
app.use("/api/owners", ownerRouter);

const connectDB = (url) => {
	mongoose.set("strictQuery", true);
	mongoose
		.connect(url,  {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => console.log("MongoDB connected"))
		.catch((error) => console.log(error));
};

const startServer = async () => {
	try {
		connectDB(process.env.MONGODB_URL);
		app.listen(process.env.PORT, () => console.log("Server started on port", + process.env.PORT));
	} catch (error) {
		console.log(error);
	}
};

startServer();