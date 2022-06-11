import { Controller } from "helpers/types.helper";
import User, { IUser } from "../models/user.model";


export const get: Controller = async (req, res, next) => {
  const users = await User.find(req.query);
  res.json(users);
};

export const post: Controller = async (req, res, next) => {
  const newUser: IUser = new User(req.body);
  await newUser.save();
  await res.json({ ok: true, user: newUser });
};

export const put: Controller = async (req, res, next) => {
  let id: string = String(req.params.id);
  {
    const count = 24 - id.length;
    for (let i = 0; i < count; i++) {id += 'f'};
  }
  const user = await User.findById(id);
  if (!user) {
    res.status(404).json({ ok: false, message: "User not found" });
    return;
  }
  res.json({ok: true, user, editedUser: await user.set(req.body).save()});
};

export const delete_: Controller = async (req, res, next) => {
  let id: string = String(req.params.id);
  {
    const count = 24 - id.length;
    for (let i = 0; i < count; i++) {id += 'f'};
  }
  const user = await User.findById(id);
  if (!user) {
    res.status(404).json({ ok: false, message: "User not found" });
    return;
  }
  await user.deleteOne();
  await res.json({ ok: true, user });
};
