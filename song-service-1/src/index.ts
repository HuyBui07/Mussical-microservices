import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

//routers
import songRouter from "./songRouter";

//heartbeat
import sendHeartbeat from "./sendHeartbeat";

//raft
import raft from "./raft";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    exposedHeaders: "X-Total-Count",
  })
);

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/", songRouter);

// raft
raft(app);

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Example song service node listening at http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((err: any) => {
    console.log(err);
  });

// Send a heartbeat every 5 seconds
setInterval(sendHeartbeat, 5000);
