import express from "express";
import { songRouter } from "./routes";

const app = express();
app.use(express.json());
app.use("/api/songs", songRouter);
export default app;
