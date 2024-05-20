import {Router} from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {checkAuthCookie} from "../middlewares/authentication.js";
import Blog from "../models/blog.js";

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const dir = path.join(__dirname, `../public/uploads/${req.user.id}`);
    if (!fs.existsSync(dir)) {
      await fs.promises.mkdir(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const fileName =`${Date.now()}-${file.originalname}`;
    cb(null,fileName );
  },
});

const upload = multer({ storage: storage });

router.get("/add", checkAuthCookie("token"), (req, res) => {
  res.render("addBlog", {user: req.user});
});

router.post("/add",checkAuthCookie("token"), upload.single("coverImage"), (req, res) => {
  const {title, content} = req.body;
  const coverImage = `/uploads/${req.user.id}/${req.file.filename}`;
  const author = req.user.id;
  Blog.create({title, content, coverImage, author});
  return res.redirect("/");
});



export default router;