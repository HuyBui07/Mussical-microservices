import { Request, Response, NextFunction } from "express";

// states
import { state } from "../raft/state";
import { servicesUrls } from "../constants/servicesState";


const getLeaderUrl = (): string | null => {
  if (state.leaderId == "service1") {
    return servicesUrls.service1;
  } else if (state.leaderId == "service2") {
    return servicesUrls.service2;
  } else if (state.leaderId == "service3") {
    return servicesUrls.service3;
  }
  return null;
};

export const forwardWriteRequestToLeader = async (
  req: Request,
  res: Response
) => {
  const leaderUrl = getLeaderUrl();
  if (!leaderUrl) {
    res.status(500).json({ error: "No leader available" });
    return;
  }

  try {
    const response = await fetch(`${leaderUrl}${req.originalUrl}`, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });
    const responseData = await response.json();
    res.status(response.status).json(responseData);
  } catch (error) {
    res.status(500).json({ error: "Failed to forward request to leader" });
  }
};

let lastReadServiceIndex = 0;

export const forwardReadRequestToNodes = async (
  req: Request,
  res: Response
) => {
    const serviceUrlsArray = Object.values(servicesUrls);
    const serviceUrl = serviceUrlsArray[lastReadServiceIndex];
    lastReadServiceIndex = (lastReadServiceIndex + 1) % serviceUrlsArray.length;
    
    try {
        const response = await fetch(`${serviceUrl}${req.originalUrl}`, {
        method: req.method,
        headers: {
            "Content-Type": "application/json",
        },
        });
        const responseData = await response.json();
        console.log("Read from service: ", serviceUrl);
        res.status(response.status).json(responseData);
    } catch (error) {
        res.status(500).json({ error: "Failed to forward request to nodes" });
    }
};
