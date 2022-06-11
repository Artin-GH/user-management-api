import { Request, Response } from "express";

export type Controller = (req: Request, res: Response, next: Function) => Promise<void>;
