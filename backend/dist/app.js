"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const database_1 = require("./config/database");
const error_middleware_1 = require("./middlewares/error.middleware");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false
}));
app.use(express_1.default.json());
app.use('/api/products', product_routes_1.default);
app.use(error_middleware_1.errorHandler);
(0, database_1.startServer)();
