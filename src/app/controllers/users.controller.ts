import { Controller } from "helpers/types.helper";
import User, { IUser } from "../models/user.model";
import { errors, statuses } from "../../helpers/constants.helper";
import { CallbackError } from "mongoose";

export const get: Controller = async (req, res, next) => {
  let id: string = req.params.id;
  if (id) {
    User.findById(id, null, (err, user) => {
      if (err) {
        res.status(statuses.Unknown).json({ ok: false, error: err });
      } else if (!user) {
        res
          .status(statuses.NotFound)
          .json({ ok: false, error: errors.NotFound });
      } else {
        res.json(user);
      }
    });
  } else {
    res.json(await User.find());
  }
};

export const post: Controller = async (req, res, next) => {
  const newUser: IUser = new User(req.body);
  User.create(newUser, (err, user) => {
    if (err) {
      res.status(500).json({ ok: false, error: err });
    } else {
      res.json({ ok: true, _id: user._id });
    }
  });
};

export const put: Controller = async (req, res, next) => {
  User.findByIdAndUpdate(
    req.params.id,
    req.body,
    (err: CallbackError, user: IUser) => {
      if (err) {
        res.status(statuses.Unknown).json({ ok: false, error: err });
      } else if (!user) {
        res
          .status(statuses.NotFound)
          .json({ ok: false, error: errors.NotFound });
      } else {
        res.json({ ok: true });
      }
    }
  );
};

export const delete_: Controller = async (req, res, next) => {
  User.findByIdAndDelete(req.params.id, (err: any, user: IUser) => {
    if (err) {
      res.status(statuses.Unknown).json({ ok: false, error: err });
    } else if (!user) {
      res.status(statuses.NotFound).json({
        ok: false,
        error: errors.NotFound,
      });
    } else {
      res.json({ ok: true });
    }
  });
};
