import * as dotenv from "dotenv";
import express from "express";

export default function createApp() {
  dotenv.config();
  const app = express();
  app.use(express.json());

  app.get("/", (req, res) => {
    res.send(`This is v${process.env.APP_VERSION}`);
  });

  return app;
}
