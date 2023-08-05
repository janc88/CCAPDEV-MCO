import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import MongoDBStore from "connect-mongodb-session"
import User from "./models/User.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const loginUser = async (req, res) => {
	try {
		const user = await User.findOne({ username: "12345678" });
		req.session.userId = user._id.toString();
		res.status(200).json({
			user: user.userInfo(),
			session: req.sessionID,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getLoggedInUser = async (req, res) => {
	try {
	  const { userId } = req.session;
	  const user = await User.findById(userId);
	  if (user)
		res.status(200).json({
			user: user.userInfo(),
			session: req.sessionID,
		});
	  else
		res.status(404).json({ 
			message: 'User not found',
			session: req.sessionID,
		});
	} catch (error) {
	  res.status(500).json({ error: error.message });
	}
};

dotenv.config();

const app = express();

app.use(express.json({ limit: "50mb" }));
// app.use(bodyParser.json({ limit: "50mb" }));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser(process.env.SESSION_SECRET));

// app.use(function(req, res, next) {
// 	res.header('Access-Control-Allow-Credentials', true);
// 	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
// 	res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
// 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-   Type, Accept, Authorization");
// 	next();
// });
// app.set('trust proxy', 1);

app.use(cors({
	origin: true,
	credentials: true,
}));

const store = new (MongoDBStore(session))({
	uri: process.env.MONGODB_URL,
	collectionName: 'sessions',
	expires: 1000 * 60 * 60 * 24 * 30, // 30 days
	connectionOptions: {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
});

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			sameSite: "none",
			secure: false,
		},
		store: store,
	})
);

app.get("/", async (req, res) => {
	res.send({ 
		message: "backend test 13",
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

const startServer = async () => {
	try {
		connectDB(process.env.MONGODB_URL);
		app.listen(process.env.PORT, () => {
			console.log(`HTTP server is running on port ${process.env.PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
};

startServer();