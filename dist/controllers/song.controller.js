"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMultipleSong = exports.deleteSong = exports.updateSong = exports.createSong = exports.getAllSongs = void 0;
const utils_1 = require("../utils");
const models_1 = require("../models");
const getAllSongs = (0, utils_1.AsyncErrorHandler)(async (_req, res) => {
    const songs = await models_1.Song.find();
    const response = {
        data: songs,
        message: "Songs fetched successfully",
        status: "Success",
        statusCode: 200,
    };
    res.status(201).json(response);
});
exports.getAllSongs = getAllSongs;
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
    const response = {
        data: song,
        message: "Song updated successfully",
        status: "Success",
        statusCode: 200,
    };
    res.status(200).json(response);
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
        data: song,
        message: "Song deleted successfully",
        status: "Success",
        statusCode: 204,
    };
    res.status(200).json(response);
});
exports.deleteSong = deleteSong;
const deleteMultipleSong = () => {
    (0, utils_1.AsyncErrorHandler)(async (req, res) => {
        const { id } = req.body;
        const song = await models_1.Song.deleteMany(id);
        if (!song) {
            const error = new utils_1.CustomError("Song not found", 404);
            throw error;
        }
        const response = {
            data: song,
            message: "Song deleted successfully",
            status: "Success",
            statusCode: 204,
        };
        res.status(200).json(response);
    });
};
exports.deleteMultipleSong = deleteMultipleSong;
