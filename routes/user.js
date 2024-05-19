import { Router } from "express";
import User from "../models/user.js";
const router = Router();

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).render("register", { error: "All fields are required" })
  }
  try {
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).redirect("/user/login");
  } catch (error) {
    res.status(400).render("register", { error: "An error occurred" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).render("login", { error: "All fields are required" })
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).render("login", { error: "User not found" });
    }
    const token = await user.comparePasswordAndGenerateToken(password);
    if (token === false){
      return res.status(401).render("login", { error: "Invalid credentials" });
    }
    res.cookie("token", token).status(200).redirect("/");
    
  } catch (error) {
    res.status(400).render("login", { error: "An error occurred" });
  }
});

export default router;
