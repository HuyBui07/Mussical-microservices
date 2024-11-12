import dotenv from "dotenv";
dotenv.config();

import express, { json } from "express";


// heartbeat
import { startHeartbeatProcess } from "./heartbeat";


const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(json());

// Start the heartbeat process and pass the app instance
startHeartbeatProcess(app);


// app.use("/balancer", multerSongUploader, (req, res) => {
//   console.log("req.body: ", req.body.tags);
//   console.log("req.files: ", req.files);
//   res.send("Hello from balancer");
// })

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Start the server
app.listen(port, () => {
  console.log(`Heartbeat receiver listening at http://localhost:${port}\n`);
});
