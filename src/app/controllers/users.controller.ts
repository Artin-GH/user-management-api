import { Controller } from "helpers/types.helper";
import User, { IUser } from "../models/user.model";

export const get: Controller = async (req, res, next) => {
  let id: string = req.params.id;
  if (id) {
    {
      const count = 24 - id.length;
      for (let i = 0; i < count; i++) {id += "f"}
    }
    const user = await User.findById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } else {
    res.json(await User.find());
  }
};

export const post: Controller = async (req, res, next) => {
  const newUser: IUser = new User(req.body);
  await newUser.save();
  await res.json({ ok: true, id: newUser._id });
};

export const put: Controller = async (req, res, next) => {
  let id: string = req.params.id;
  {
    const count = 24 - id.length;
    for (let i = 0; i < count; i++) {
      id += "f";
    }
  }
  const user = await User.findById(id);
  if (!user) {
    res.status(404).json({ ok: false, message: "User not found" });
    return;
  }
  await user.set(req.body).save();
  res.json({ ok: true });
};

export const delete_: Controller = async (req, res, next) => {
  let id: string = req.params.id;
  {
    const count = 24 - id.length;
    for (let i = 0; i < count; i++) {
      id += "f";
    }
  }
  const user = await User.findById(id);
  if (!user) {
    res.status(404).json({ ok: false, message: "User not found" });
    return;
  }
  await user.deleteOne();
  await res.json({ ok: true });
};
