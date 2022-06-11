import createHttpError, { HttpError } from "http-errors";
import express, {
  Express,
  NextFunction,
  Request,
  Response,
} from "express";
import cookieParser from "cookie-parser";
import logger from 'morgan';
import bodyParser from "body-parser";
import * as routers from './app/routers';
const fileUpload = require('express-fileupload');

const app: Express = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(fileUpload());

app.use("/users", routers.users);
app.use('/', async (req, res, next) => {
  await res.redirect('/users')
})

app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createHttpError(404));
});

app.use((
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  err.status = err.status || 500;
  res.json({ error: err });
});

export default app;
