"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBulkSong = exports.songStat = exports.deleteMultipleSong = exports.deleteSong = exports.updateSong = exports.createSong = exports.getSongById = exports.getAllSongs = void 0;
const utils_1 = require("../utils");
const models_1 = require("../models");
const getAllSongs = (0, utils_1.AsyncErrorHandler)(async (_req, res) => {
    const songs = await models_1.Song.find();
    const response = {
        data: songs,
        message: "Songs fetched successfully",
        status: "Success",
        statusCode: 200,
        totalData: songs.length,
    };
    res.status(200).json(response);
});
exports.getAllSongs = getAllSongs;
const getSongById = (0, utils_1.AsyncErrorHandler)(async (req, res) => {
    const { id } = req.params;
    const song = await models_1.Song.findById(id);
    if (song) {
        const response = {
            data: song,
            message: "Song fetched successfully",
            status: "Success",
            statusCode: 200,
        };
        res.status(200).json(response);
    }
    const customError = new utils_1.CustomError("Song not found", 404);
    throw customError;
});
exports.getSongById = getSongById;
const createSong = (0, utils_1.AsyncErrorHandler)(async (req, res) => {
    const song = await models_1.Song.create(req.body);
    const response = {
        data: song,
        message: "Song created successfully",
        status: "Success",
        statusCode: 201,
    };
    res.status(201).json(response);
});
exports.createSong = createSong;
const createBulkSong = (0, utils_1.AsyncErrorHandler)(async (req, res) => {
    const song = await models_1.Song.insertMany(req.body.list);
    const response = {
        data: song,
        message: "Song created successfully",
        status: "Success",
        statusCode: 201,
    };
    res.status(201).json(response);
});
exports.createBulkSong = createBulkSong;
const updateSong = (0, utils_1.AsyncErrorHandler)(async (req, res) => {
    const { id } = req.params;
    const song = await models_1.Song.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!song) {
        const error = new utils_1.CustomError("Song not found", 404);
        throw error;
    }
    else {
        const response = {
            data: song,
            message: "Song updated successfully",
            status: "Success",
            statusCode: 200,
        };
        res.status(200).json(response);
    }
});
exports.updateSong = updateSong;
const deleteSong = (0, utils_1.AsyncErrorHandler)(async (req, res) => {
    const { id } = req.params;
    const song = await models_1.Song.findByIdAndDelete(id);
    if (!song) {
        const error = new utils_1.CustomError("Song not found", 404);
        throw error;
    }
    const response = {
        // data: song,
        message: "Song deleted successfully",
        status: "Success",
        statusCode: 204,
    };
    res.status(204).json(response);
});
exports.deleteSong = deleteSong;
const deleteMultipleSong = (0, utils_1.AsyncErrorHandler)(async (req, res) => {
    const { id } = req.body;
    if (!id || !Array.isArray(id) || id.length === 0) {
        const error = new utils_1.CustomError("Please provide an array of song IDs", 400);
        throw error;
    }
    const result = await models_1.Song.deleteMany({ _id: { $in: id } });
    if (result.deletedCount === 0) {
        const error = new utils_1.CustomError("No songs found to delete", 404);
        throw error;
    }
    const response = {
        data: result,
        message: `${result.deletedCount} song(s) deleted successfully`,
        status: "Success",
        statusCode: 200,
    };
    res.status(200).json(response);
});
exports.deleteMultipleSong = deleteMultipleSong;
const songStat = (0, utils_1.AsyncErrorHandler)(async (req, res) => {
    const totalSongs = await models_1.Song.countDocuments();
    const totalGenre = await (await models_1.Song.distinct("genre")).length;
    const totalAlbum = await (await models_1.Song.distinct("album")).length;
    const totalArtist = await (await models_1.Song.distinct("artist")).length;
    const response = {
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
exports.songStat = songStat;
