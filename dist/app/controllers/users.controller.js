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
const get = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.default.find(req.query);
    res.json(users);
});
exports.get = get;
const post = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new user_model_1.default(req.body);
    yield newUser.save();
    yield res.json({ ok: true, user: newUser });
});
exports.post = post;
const put = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let id = String(req.params.id);
    {
        const count = 24 - id.length;
        for (let i = 0; i < count; i++) {
            id += 'f';
        }
        ;
    }
    const user = yield user_model_1.default.findById(id);
    if (!user) {
        res.status(404).json({ ok: false, message: "User not found" });
        return;
    }
    res.json({ ok: true, user, editedUser: yield user.set(req.body).save() });
});
exports.put = put;
const delete_ = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let id = String(req.params.id);
    {
        const count = 24 - id.length;
        for (let i = 0; i < count; i++) {
            id += 'f';
        }
        ;
    }
    const user = yield user_model_1.default.findById(id);
    if (!user) {
        res.status(404).json({ ok: false, message: "User not found" });
        return;
    }
    yield user.deleteOne();
    yield res.json({ ok: true, user });
});
exports.delete_ = delete_;
