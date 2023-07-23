import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import userRouter from "./routes/user.routes.js";
import reviewRouter from "./routes/review.routes.js";
import restaurantRouter from "./routes/restaurant.routes.js";
import imageRouter from "./routes/image.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.send({ message: "hello world" });
});

app.use("/api/users", userRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/restaurants", restaurantRouter);
app.use("/api/images", imageRouter);

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