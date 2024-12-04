import express from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import session from "express-session";
import { localMiddleWare } from "./middlewares";
import MongoStore from "connect-mongo";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 20000,
    },
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

app.use(localMiddleWare);
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;