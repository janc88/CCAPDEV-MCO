import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import MongoDBStore from "connect-mongodb-session"

import userRouter from "./routes/user.routes.js";
import reviewRouter from "./routes/review.routes.js";
import restaurantRouter from "./routes/restaurant.routes.js";
import imageRouter from "./routes/image.routes.js";
import ownerRouter from "./routes/owner.routes.js";


dotenv.config();

const app = express();
app.use(cors({
	origin: true,
	credentials: true,
}));
app.use(express.json({ limit: "50mb" }));

const store = new (MongoDBStore(session))({
	uri: process.env.MONGODB_URL,
	collectionName: 'sessions',
	ttl: 30 * 24 * 60 * 60, // 30 days
});
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			sameSite: "none",
			secure: true,
		},
		store: store,
	})
);

app.get("/", async (req, res) => {
	res.send({ 
		message: "backend test 5",
		env: {
			SESSION_SECRET: process.env.SESSION_SECRET,
			MONGODB_URL: process.env.MONGODB_URL,
			PORT: process.env.PORT,
			mode: process.env.NODE_ENV,
		}
	});
});
app.use("/api/users", userRouter);
// app.use("/api/reviews", reviewRouter);
// app.use("/api/restaurants", restaurantRouter);
// app.use("/api/images", imageRouter);
// app.use("/api/owners", ownerRouter);

const connectDB = (url) => {
	mongoose.set("strictQuery", true);
	mongoose
		.connect(url)
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