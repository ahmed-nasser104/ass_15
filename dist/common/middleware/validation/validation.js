"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrapgQLValidation = exports.validation = void 0;
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
const GrapgQLValidation = (schema, args) => {
    const value = schema.safeParse(args);
    let validationErros = [];
    if (!value.success) {
        validationErros.push({
            error: value.error.issues,
        });
        throw (0, error_response_1.GraphqlErrorHandler)(new error_response_1.badRequest("Validation error", { error: validationErros }));
    }
    return true;
};
exports.GrapgQLValidation = GrapgQLValidation;
