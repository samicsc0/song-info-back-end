import { Request, Response } from "express";
import { AsyncErrorHandler, CustomError } from "../utils";
import { Song } from "../models";
import { ApiSuccess, StatResponse } from "../types";

const getAllSongs = AsyncErrorHandler(async (_req: Request, res: Response) => {
  const songs = await Song.find();
  const response: ApiSuccess<typeof songs> = {
    data: songs,
    message: "Songs fetched successfully",
    status: "Success",
    statusCode: 200,
    totalData: songs.length,
  };
  res.status(200).json(response);
});
const getSongById = AsyncErrorHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const song = await Song.findById(id);
  if (song) {
    const response: ApiSuccess<typeof song> = {
      data: song,
      message: "Song fetched successfully",
      status: "Success",
      statusCode: 200,
    };
    res.status(200).json(response);
  }
  const customError = new CustomError("Song not found", 404);
  throw customError;
});
const createSong = AsyncErrorHandler(async (req: Request, res: Response) => {
  const song = await Song.create(req.body);
  const response: ApiSuccess<typeof song> = {
    data: song,
    message: "Song created successfully",
    status: "Success",
    statusCode: 201,
  };
  res.status(201).json(response);
});
const updateSong = AsyncErrorHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const song = await Song.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!song) {
    const error = new CustomError("Song not found", 404);
    throw error;
  } else {
    const response: ApiSuccess<typeof song> = {
      data: song,
      message: "Song updated successfully",
      status: "Success",
      statusCode: 200,
    };
    res.status(200).json(response);
  }
});
const deleteSong = AsyncErrorHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const song = await Song.findByIdAndDelete(id);
  if (!song) {
    const error = new CustomError("Song not found", 404);
    throw error;
  }
  const response: ApiSuccess<typeof song> = {
    // data: song,
    message: "Song deleted successfully",
    status: "Success",
    statusCode: 204,
  };
  res.status(204).json(response);
});
const deleteMultipleSong = AsyncErrorHandler(
  async (req: Request, res: Response) => {
    const { id } = req.body;
    if (!id || !Array.isArray(id) || id.length === 0) {
      const error = new CustomError("Please provide an array of song IDs", 400);
      throw error;
    }
    const result = await Song.deleteMany({ _id: { $in: id } });
    if (result.deletedCount === 0) {
      const error = new CustomError("No songs found to delete", 404);
      throw error;
    }
    const response: ApiSuccess<typeof result> = {
      data: result,
      message: `${result.deletedCount} song(s) deleted successfully`,
      status: "Success",
      statusCode: 200,
    };
    res.status(200).json(response);
  }
);
const songStat = AsyncErrorHandler(async (req: Request, res: Response) => {
  const totalSongs = await Song.countDocuments();
  const totalGenre = await (await Song.distinct("genre")).length;
  const totalAlbum = await (await Song.distinct("album")).length;
  const totalArtist = await (await Song.distinct("artist")).length;

  const response: ApiSuccess<StatResponse> = {
    data: {
      totalAlbums: totalAlbum,
      totalArtists: totalArtist,
      totalSongs: totalSongs,
      totalGenres: totalGenre,
    },
    status: "Success",
    statusCode: 200,
    message: "Stats fetched successfully",
  };
  res.status(200).json(response);
});
export {
  getAllSongs,
  getSongById,
  createSong,
  updateSong,
  deleteSong,
  deleteMultipleSong,
  songStat,
};
