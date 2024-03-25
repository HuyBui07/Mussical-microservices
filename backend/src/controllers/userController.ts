import { Request, Response } from "express";
import User from "../models/userModel";
import jwt from "jsonwebtoken";

const createToken = (_id: string) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY as string, {
    expiresIn: "3d",
  });
};

const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.logIn(email, password);

    const token = createToken(user._id);

    res.status(200).json({
      user: {
        email: user.email,
      },
      token,
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.signUp(email, password);

    const token = createToken(user._id);

    res.status(200).json({
      user: {
        _id: user._id,
        email: user.email,
      },
      token,
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export { loginUser, registerUser };
