import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";
import userRouter from "./routes/user.js";
import connectDB from "./connection.js";
import { checkAuthCookie } from "./middlewares/authentication.js";
const app = express();
const port = process.env.PORT;
console.log()

// Connect to MongoDB
const uri = process.env.MONGO_URI;
const options = {
  dbName: process.env.DB_NAME,
};
connectDB(uri, options);

// Set up the view engine
app.set("view engine", "ejs");

// Set up the middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkAuthCookie("token"));

// Set up the routes
app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

app.use("/user", userRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
