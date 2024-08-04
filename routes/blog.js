import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { checkAuthCookie } from "../middlewares/authentication.js";
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
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.get("/add", checkAuthCookie("token"), (req, res) => {
  res.render("addBlog", { user: req.user });
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("author");
  res.render("blog", { user: req.user, blog });
});

router.post(
  "/add",
  checkAuthCookie("token"),
  upload.single("coverImage"),
  async (req, res) => {
    try {
      const { title, content } = req.body;

      const coverImage = `/uploads/${req.user.id}/${req.file.filename}`;

      const author = req.user.id;
      await Blog.create({ title, content, coverImage, author });
      return res.redirect("/");
    } catch (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
  }
);

export default router;
