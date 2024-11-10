import express, { json } from "express";
import dotenv from "dotenv";

// routers
import balancerRouter from "./balancer/router";

// heartbeat
import { startHeartbeatProcess } from "./heartbeat";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(json());

// Start the heartbeat process and pass the app instance
startHeartbeatProcess(app);

// Mount the balancer router
app.use("/balancer", balancerRouter);

// Start the server
app.listen(port, () => {
  console.log(`Heartbeat receiver listening at http://localhost:${port}\n`);
});
