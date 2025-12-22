"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const app_1 = __importDefault(require("./app"));
console.log("starting app");
(0, config_1.db)().then(() => {
    console.log("db connected");
    app_1.default.listen(3000, () => {
        console.log(`Server started running on 3000`);
    });
});
