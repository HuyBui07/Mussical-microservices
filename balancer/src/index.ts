import express, { json } from "express";
import chalk from "chalk";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Alert function to send a message to a Slack channel
const sendAlert = async (message: string) => {
  try {
    const response = await fetch(process.env.SLACK_WEBHOOK_URL as string, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: message }),
    });
    if (response.ok) {
      console.info("Alert sent via Slack\n");
    } else {
      console.error("Failed to send alert via Slack:", response.statusText);
    }
  } catch (error: any) {
    console.error("Error sending alert via Slack:", error.message);
  }
};

// Middleware to parse JSON bodies
app.use(json());

const heartbeatLastReceived: { [key: string]: number } = {
  service1: Date.now(),
  service2: Date.now(),
  service3: Date.now(),
};
const sourceLiveStatus: { [key: string]: boolean } = {
  service1: true,
  service2: true,
  service3: true,
};

// Function to handle downtime
// Function to check for downtime
function handleDowntime(source: string, intervalId: NodeJS.Timeout) {
  clearInterval(intervalId);
  const currentTime = Date.now();

  console.error(
    chalk.red(
      `\nSource ${source} is down at ${new Date(
        currentTime
      ).toLocaleTimeString()}`
    )
  );
  sourceLiveStatus[source] = false;
  sendAlert(`:rotating_light: Source ${source} is down! :rotating_light:`);
}

const TIMEOUT_DURATION = 8000;

// Set intervals to check for downtime
let service1IntervalId = setInterval(
  () => handleDowntime("service1", service1IntervalId),
  TIMEOUT_DURATION
);
let service2IntervalId = setInterval(
  () => handleDowntime("service2", service2IntervalId),
  TIMEOUT_DURATION
);
let service3IntervalId = setInterval(
  () => handleDowntime("service3", service3IntervalId),
  TIMEOUT_DURATION
);

// Route to handle heartbeat POST requests
app.post("/heartbeat", (req, res) => {
  const { source }: { source: string } = req.body;
  heartbeatLastReceived[source] = Date.now();
  console.info(
    `Received heartbeat from ${source} at ${new Date(
      heartbeatLastReceived[source]
    ).toLocaleTimeString()}`
  );

  // If the status was down, send an alert that the source is back up
  if (!sourceLiveStatus[source]) {
    console.info(
      chalk.green(
        `\nSource ${source} is back up at ${new Date(
          heartbeatLastReceived[source]
        ).toLocaleTimeString()}`
      )
    );
    sendAlert(`\n:tada: Source ${source} is back up! :tada:\n`);
    sourceLiveStatus[source] = true;

    // Reset the interval to check for downtime
    if (source === "service1") {
      service1IntervalId = setInterval(
        () => handleDowntime("service1", service1IntervalId),
        TIMEOUT_DURATION
      );
    } else if (source === "service2") {
      service2IntervalId = setInterval(
        () => handleDowntime("service2", service2IntervalId),
        TIMEOUT_DURATION
      );
    } else if (source === "service3") {
      service3IntervalId = setInterval(
        () => handleDowntime("service3", service3IntervalId),
        TIMEOUT_DURATION
      );
    }
    res.status(200).send("Heartbeat received");
    return;
  }

  // Set an interval to check for downtime every minute
  if (source === "service1") {
    clearInterval(service1IntervalId);
    service1IntervalId = setInterval(
      () => handleDowntime("service1", service1IntervalId),
      TIMEOUT_DURATION
    );
  } else if (source === "service2") {
    clearInterval(service2IntervalId);
    service2IntervalId = setInterval(
      () => handleDowntime("service2", service2IntervalId),
      TIMEOUT_DURATION
    );
  } else if (source === "service3") {
    clearInterval(service3IntervalId);
    service3IntervalId = setInterval(
      () => handleDowntime("service3", service3IntervalId),
      TIMEOUT_DURATION
    );
  }

  res.status(200).send("Heartbeat received");
});

// Start the server
app.listen(port, () => {
  console.log(`Heartbeat receiver listening at http://localhost:${port}\n`);
});
