"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResponce = void 0;
const successResponce = ({ res, data, message, status, }) => {
    res.status(status).json({ message, data });
};
exports.successResponce = successResponce;
