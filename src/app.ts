import express from "express";
import { songRouter } from "./routes";
import { GlobalErrorHandlerMiddleware } from "./middlewares";

const app = express();
app.use(express.json());
app.use("/api/song", songRouter);
app.use(GlobalErrorHandlerMiddleware);
export default app;
