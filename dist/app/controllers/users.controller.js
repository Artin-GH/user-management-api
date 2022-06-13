"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_ = exports.put = exports.post = exports.get = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const constants_helper_1 = require("../../helpers/constants.helper");
const get = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    if (id) {
        user_model_1.default.findById(id, null, (err, user) => {
            if (err) {
                res.status(constants_helper_1.statuses.Unknown).json({ ok: false, error: err });
            }
            else if (!user) {
                res
                    .status(constants_helper_1.statuses.NotFound)
                    .json({ ok: false, error: constants_helper_1.errors.NotFound });
            }
            else {
                res.json(user);
            }
        });
    }
    else {
        res.json(yield user_model_1.default.find());
    }
});
exports.get = get;
const post = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new user_model_1.default(req.body);
    user_model_1.default.create(newUser, (err, user) => {
        if (err) {
            res.status(constants_helper_1.statuses.Unknown).json({ ok: false, error: err });
        }
        else {
            res.json({ ok: true, _id: user._id });
        }
    });
});
exports.post = post;
const put = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    user_model_1.default.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
        if (err) {
            res.status(constants_helper_1.statuses.Unknown).json({ ok: false, error: err });
        }
        else if (!user) {
            res
                .status(constants_helper_1.statuses.NotFound)
                .json({ ok: false, error: constants_helper_1.errors.NotFound });
        }
        else {
            res.json({ ok: true });
        }
    });
});
exports.put = put;
const delete_ = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    user_model_1.default.findByIdAndDelete(req.params.id, (err, user) => {
        if (err) {
            res.status(constants_helper_1.statuses.Unknown).json({ ok: false, error: err });
        }
        else if (!user) {
            res.status(constants_helper_1.statuses.NotFound).json({
                ok: false,
                error: constants_helper_1.errors.NotFound,
            });
        }
        else {
            res.json({ ok: true });
        }
    });
});
exports.delete_ = delete_;
