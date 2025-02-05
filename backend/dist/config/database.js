"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const sequelize_1 = require("sequelize");
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        console.log("Database connected successfully!");
        yield sequelize.sync({ alter: true });
        console.log("Database synced!");
    }
    catch (error) {
        console.error("Failed to start the server:", error);
    }
});
exports.startServer = startServer;
const sequelize = new sequelize_1.Sequelize('billing_app', 'postgres', '12345678', {
    host: 'localhost',
    dialect: 'postgres',
});
exports.default = sequelize;
