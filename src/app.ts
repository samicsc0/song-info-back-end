import express from "express";
import { songRouter } from "./routes";
import { GlobalErrorHandlerMiddleware } from "./middlewares";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/song", songRouter);
app.use(GlobalErrorHandlerMiddleware);
export default app;
