import express from "express";

import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import Post from "../mongodb/models/post.js";
const router = express.Router();
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_SECRET,
});

router.route("/").get(async (req, res) => {
  try {
    console.log("getting request");
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ sucess: false, message: err });
  }
});
router.route("/").post(async (req, res) => {
  try {
    console.log("getting request for posting");
    const { name, prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo, {
      folder: "aigen", // Optional: specify folder name in Cloudinary if needed
    });

    console.log(photoUrl);

    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });

    res.status(200).json({ sucess: true, data: newPost });
  } catch (err) {
    res.status(500).json({ sucess: false, message: err });
  }
});

export default router;
