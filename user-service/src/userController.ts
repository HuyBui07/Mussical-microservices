import { Request, Response } from "express";
import User from "./userModel";
import jwt from "jsonwebtoken";

export const createToken = (_id: string) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY as string);
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.logIn(email, password);

    const token = createToken(user._id as string);

    res.status(200).json({
      email: user.email,
      token,
    });
  } catch (err: any) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.signUp(email, password);

    const token = createToken(user._id as string);

    res.status(200).json({
      email: user.email,
      token,
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
