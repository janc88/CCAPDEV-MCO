import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import MongoDBStore from "connect-mongodb-session"

const loginUser = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		const hashedPassword = crypto.SHA256(password).toString();

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		} else if (user.password !== hashedPassword) {
			return res.status(401).json({ error: "Wrong password" });
		}

		req.session.userId = user._id.toString();
		res.status(200).json(user.userInfo());
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getLoggedInUser = async (req, res) => {
	try {
	  const { userId } = req.session;
	  const user = await User.findById(userId);
	  if (user)
		res.status(200).json(user.userInfo());
	  else
		res.status(404).json({ message: 'User not found' });
	} catch (error) {
	  res.status(500).json({ error: error.message });
	}
};

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
		message: "backend test 8",
	});
});

app.post('api/users/login', loginUser);
app.get('api/users/me', getLoggedInUser);

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