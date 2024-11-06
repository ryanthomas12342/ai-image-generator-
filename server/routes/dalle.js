import express from "express";
import OpenAI from "openai";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPEN_API, // This is also the default, can be omitted
});
router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log(prompt);
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });
    console.log(response);
    res.status(200).json({
      success: true,
      photo: response.data[0].url,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      success: false,
      error: response.data.error.message,
    });
  }
});

router.route("/").get((req, res) => {
  res.send("hello from dalle");
});

export default router;
