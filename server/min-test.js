import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import MongoDBStore from "connect-mongodb-session"
import User from "./models/user.js";
import https from 'https';
import fs from 'fs';

const loginUser = async (req, res) => {
	try {
		const user = await User.findOne({ username: "12345678" });
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
		message: "backend test 10",
	});
});

app.post('/login', loginUser);
app.get('/me', getLoggedInUser);

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

// const privateKey = fs.readFileSync('server.key', 'utf8');
// const certificate = fs.readFileSync('server.cert', 'utf8');
// const credentials = { key: privateKey, cert: certificate };
// const httpsServer = https.createServer(credentials, app);
const startServer = async () => {
	try {
		// connectDB(process.env.MONGODB_URL);
		// httpsServer.listen(process.env.PORT, () => {
		// 	console.log(`HTTPS server is running on port ${process.env.PORT}`);
		// });
		app.listen(process.env.PORT, () => {
			console.log(`HTTP server is running on port ${process.env.PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
};

startServer();