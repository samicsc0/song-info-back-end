"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Song = void 0;
const mongoose_1 = require("mongoose");
const songSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },
    album: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.Song = (0, mongoose_1.model)("Song", songSchema);
