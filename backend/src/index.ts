import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

//routers
import userRouter from "./routes/userRouter";

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/users", userRouter);

mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Example app listening at http://localhost:${port}/api/todos`);
    });
  })
  .catch((err: any) => {
    console.log(err);
  });
