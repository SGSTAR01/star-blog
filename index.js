import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";
import userRouter from "./routes/user.js";
import blogRouter from "./routes/blog.js";
import connectDB from "./connection.js";
import { checkAuthCookie } from "./middlewares/authentication.js";
import Blog from "./models/blog.js";

const app = express();
const port = process.env.PORT;
console.log();

// Connect to MongoDB
const uri = process.env.MONGO_URI;
const options = {
  dbName: process.env.DB_NAME,
};
connectDB(uri, options);

// Set up the view engine
app.set("view engine", "ejs");
app.set("views", "views");

// Set up the middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkAuthCookie("token"));
app.use(express.static("public"));

// Set up the routes
app.get("/", async(req, res) => {
  const allBlogs = await Blog.find().sort([['createdAt', -1]]);
  res.render("home", { user: req.user, blogs: allBlogs });
});

app.use("/user", userRouter);
app.use("/blog", blogRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
