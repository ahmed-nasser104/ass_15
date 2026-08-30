"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const error_response_1 = require("../response/error.response");
const validation = (schema) => {
    return (req, res, next) => {
        let validationErros = [];
        for (const key of Object.keys(schema)) {
            if (!schema[key]) {
                throw new error_response_1.badRequest("Validation error");
            }
            const value = schema[key].safeParse(req[key]);
            if (!value.success) {
                validationErros.push({
                    key,
                    issue: value.error.issues,
                });
            }
            if (validationErros.length > 0) {
                throw new error_response_1.badRequest("validatioin error", validationErros);
            }
            next();
        }
    };
};
exports.validation = validation;
