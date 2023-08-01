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

import FixReferences from "./scripts/FixReferences.js";


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
	ttl: 30 * 24 * 60 * 60,
});
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			sameSite: "lax",
		},
		store: store,
	})
);

app.get("/", async (req, res) => {
	await FixReferences();
	res.send({ message: "hello world" });
});

app.use("/api/users", userRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/restaurants", restaurantRouter);
app.use("/api/images", imageRouter);
app.use("/api/owners", ownerRouter);

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

		app.listen(8080, () => console.log("Server started on port 8080"));
	} catch (error) {
		console.log(error);
	}
};

startServer();