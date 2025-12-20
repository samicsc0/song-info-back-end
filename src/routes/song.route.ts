import { Router } from "express";
import {
  getAllSongs,
  getSongById,
  createSong,
  updateSong,
  deleteSong,
  deleteMultipleSong,
} from "../controllers/song.controller";

const router = Router();

router.post("/", createSong);
router.get("/", getAllSongs);
router.get("/:id", getSongById);
router.patch("/:id", updateSong);
router.delete("/", deleteMultipleSong);
router.delete("/:id", deleteSong);

export default router;
