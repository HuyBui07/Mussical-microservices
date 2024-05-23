import dotenv from "dotenv";
import { loginUser } from "../../controllers/userController";
import { registerUser } from "../../controllers/userController";
import { Request, Response } from "express";
import { createToken } from "../../controllers/userController";
import { mock } from "jest-mock-extended";

import User from "../../models/userModel";
dotenv.config();
export const mockRequest = () => {
  const req: any = {};
  req.body = jest.fn().mockReturnValue(req);
  req.params = jest.fn().mockReturnValue(req);
  return req;
};

export const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const req = mockRequest();
const res = mockResponse();

describe("loginUser", () => {
  const email = "gg123@gmail.com";
  const password = "123456";

  it("should return 200 if user is logged in", async () => {
    req.body = { email, password };

    const user = {
      _id: "123",
      email,
    };

    User.logIn = jest.fn().mockResolvedValue(user);

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      email: user.email,
      token: createToken(user._id),
    });
  });

  it("should return 400 if login fails", async () => {
    req.body = { email, password };

    User.logIn = jest.fn().mockRejectedValue(new Error("Login failed"));

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Login failed" });
  });
});

//register

describe("registerUser", () => {
  const email = "gg123@gmail.com";
  const password = "123456";
  it("should return 200 if user is registered", async () => {
    req.body = { email, password };

    const user = {
      _id: "123",
      email,
    };

    User.signUp = jest.fn().mockResolvedValue(user);

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith({
      email: user.email,
      token: createToken(user._id),
    });
  });
});
