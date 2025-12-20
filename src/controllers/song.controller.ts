import { Request, Response } from "express";
import { AsyncErrorHandler, CustomError } from "../utils";
import { Song } from "../models";
import { ApiSuccess } from "../types";

const getAllSongs = AsyncErrorHandler(async (_req: Request, res: Response) => {
  const songs = await Song.find();
  const response: ApiSuccess<typeof songs> = {
    data: songs,
    message: "Songs fetched successfully",
    status: "Success",
    statusCode: 200,
  };
  res.status(201).json(response);
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
  }
  const response: ApiSuccess<typeof song> = {
    data: song,
    message: "Song updated successfully",
    status: "Success",
    statusCode: 200,
  };
  res.status(200).json(response);
});
const deleteSong = AsyncErrorHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const song = await Song.findByIdAndDelete(id);
  if (!song) {
    const error = new CustomError("Song not found", 404);
    throw error;
  }
  const response: ApiSuccess<typeof song> = {
    data: song,
    message: "Song deleted successfully",
    status: "Success",
    statusCode: 204,
  };
  res.status(200).json(response);
});
const deleteMultipleSong = () => {
  AsyncErrorHandler(async (req: Request, res: Response) => {
    const { id } = req.body;
    const song = await Song.deleteMany(id);
    if (!song) {
      const error = new CustomError("Song not found", 404);
      throw error;
    }
    const response: ApiSuccess<typeof song> = {
      data: song,
      message: "Song deleted successfully",
      status: "Success",
      statusCode: 204,
    };
    res.status(200).json(response);
  });
};
export { getAllSongs, createSong, updateSong, deleteSong, deleteMultipleSong };
