import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import MongoDBStore from "connect-mongodb-session"

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import crypto from "crypto-js";
import User from "./models/User.js";

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

app.use(passport.initialize());
app.use(passport.session());

passport.use(
	new LocalStrategy(async (username, password, done) => {
		try {
			const user = await User.findOne({ username });

			if (!user) {
				return done(null, false, { message: 'User not found' });
			}

			const hashedPassword = crypto.SHA256(password).toString();

			if (user.password !== hashedPassword) {
				return done(null, false, { message: 'Wrong password' });
			}

			return done(null, user);
		} catch (error) {
			return done(error);
		}
	})
);
passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findById(id);
		done(null, user);
	} catch (error) {
		done(error);
	}
});

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
		app.listen(process.env.PORT, () => console.log("Server started on port", + process.env.PORT));
	} catch (error) {
		console.log(error);
	}
};

startServer();