const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const PORT = 4000;

// Proxy
const target = "http://localhost:5002";

const proxy = createProxyMiddleware({
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

app.use("/proxy", proxy);

app.use("/", (req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Endpoint for chaning the leader
app.get("/change-leader", (req, res) => {
  const [source] = req.body;
  let newTarget;
  if (source === "service1") {
    newTarget = "http://localhost:5002";
  } else if (source === "service2") {
    newTarget = "http://localhost:5003";
  } else if (source === "service3") {
    newTarget = "http://localhost:5004";
  }
  if (newTarget) {
    proxy.target = newTarget;
    res.send(`Target has been changed to ${newTarget}`);
  } else {
    res.status(400).send("Please provide a target");
  }
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
