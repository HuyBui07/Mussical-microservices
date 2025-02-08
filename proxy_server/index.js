const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const PORT = 4000;

// Proxy default leader
let currentTarget = "http://localhost:5002";
let sideService1 = "http://localhost:5003";
let sideService2 = "http://localhost:5004";

// Function to create a new proxy middleware with the updated target
const createProxy = (target) => {
  return createProxyMiddleware({
    target: target,
    changeOrigin: true,
    timeout: 30000,
    pathRewrite: {
      [`^/proxy`]: "",
    },
    on: {
      req: (proxyReq, req, res) => {},
      error: (err, req, res) => {
        console.error(err);
        res.status(500).send("Something went wrong!");
      },
    },
  });
};

// Create initial proxy middleware
let proxy = createProxy(currentTarget);
let sideProxy1 = createProxy(sideService1);
let sideProxy2 = createProxy(sideService2);

let counter = 0;
app.use("/proxy", (req, res, next) => {
  if (req.method === "GET") {
    const proxies = [sideProxy1, sideProxy2];
    
    proxies[counter % proxies.length](req, res, next);
    counter++;
  } else proxy(req, res, next);
});

app.use(express.json());

app.use("/", (req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Endpoint for changing the leader
app.post("/change-leader", (req, res) => {
  const { source } = req.body;
  let newTarget;
  if (source === "service1") {
    newTarget = "http://localhost:5002";
  } else if (source === "service2") {
    newTarget = "http://localhost:5003";
  } else if (source === "service3") {
    newTarget = "http://localhost:5004";
  }
  if (newTarget) {
    currentTarget = newTarget;
    proxy = createProxy(newTarget); // Create a new proxy middleware with the updated target
    res.send(`Target has been changed to ${newTarget}`);
  } else {
    res.status(400).send("Please provide a valid target");
  }
});

// Endpoint for getting the current target
app.get("/current-leader", (req, res) => {
  let currentLeader;
  switch (currentTarget) {
    case "http://localhost:5002":
      currentLeader = "service1";
      break;
    case "http://localhost:5003":
      currentLeader = "service2";
      break;
    case "http://localhost:5004":
      currentLeader = "service3";
      break;
    default:
      currentLeader = "unknown";
  }
  res.send(currentLeader);
});

app.listen(PORT, () => {
  console.log(`Proxy server listening at http://localhost:${PORT}`);
});
