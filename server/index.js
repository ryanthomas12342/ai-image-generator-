import express from "express";

import * as dotenv from "dotenv";
import cors from "cors";

import post from "./routes/post.js";
import dalle from "./routes/dalle.js";

import connectDb from "./mongodb/connect.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/post", post);
app.use("/api/v1/dalle", dalle);

app.get("/", async (req, res) => {
  res.send("hello ");
});

const startServer = async () => {
  try {
    connectDb(process.env.MONGODB);

    app.listen(8080, () => console.log("the server is listening "));
  } catch (err) {
    console.log(err);
  }
};

startServer();
