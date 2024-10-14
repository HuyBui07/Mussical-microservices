import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

type Role = "user" | "admin";

interface IUser extends Document {
  email: string;
  passwordHash: string;
  role: Role;
  history: {
    type: Schema.Types.ObjectId;
    ref: "HistoryRecord";
    required: false;
    default: [];
  };
}

interface IUserModel extends Model<IUser> {
  logIn(email: string, password: string): Promise<IUser>;
  signUp(email: string, password: string): Promise<IUser>;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
  role: {
    type: String,
    required: false,
    enum: ["user", "admin"],
    default: "user",
  },
  history: {
    type: [{ type: Schema.Types.ObjectId, ref: "HistoryRecord" }],
    required: false,
    default: [],
  },
}, {collection: "user-service"});

userSchema.statics.logIn = async function (email, password) {
  if (!email || !password) {
    throw new Error("Missing email or password");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("User does not exist");
  }

  const match = await bcrypt.compare(password, user.passwordHash);

  if (!match) {
    throw new Error("Wrong password");
  }

  return user;
};

userSchema.statics.signUp = async function (email, password) {
  if (!email || !password) {
    throw new Error("Missing email or password");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid email");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = new this({ email, passwordHash: passwordHash, role: "user" });
  await user.save();
  return user;
};

export default mongoose.model<IUser, IUserModel>("User", userSchema);
