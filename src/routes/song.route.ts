import { Router } from "express";
import {
  getAllSongs,
  getSongById,
  createSong,
  updateSong,
  deleteSong,
  deleteMultipleSong,
  songStat,
} from "../controllers/song.controller";

const router = Router();

router.post("/", createSong);
router.get("/", getAllSongs);
router.get("/stat", songStat);
router.get("/:id", getSongById);
router.patch("/:id", updateSong);
router.delete("/", deleteMultipleSong);
router.delete("/:id", deleteSong);

export default router;
