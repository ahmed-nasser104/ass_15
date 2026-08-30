"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceUnavailable = exports.badGateway = exports.notImplemented = exports.internalServerError = exports.tooManyRequests = exports.unprocessableEntity = exports.conflict = exports.notFound = exports.forbidden = exports.unauthorized = exports.badRequest = void 0;
class ErrorApllication extends Error {
    status;
    constructor(message, status, cause) {
        super(message, { cause });
        this.status = status;
    }
}
class badRequest extends ErrorApllication {
    constructor(message, cause) {
        super(message, 400, cause);
    }
}
exports.badRequest = badRequest;
class unauthorized extends ErrorApllication {
    constructor(message, cause) {
        super(message, 401, cause);
    }
}
exports.unauthorized = unauthorized;
class forbidden extends ErrorApllication {
    constructor(message, cause) {
        super(message, 403, cause);
    }
}
exports.forbidden = forbidden;
class notFound extends ErrorApllication {
    constructor(message, cause) {
        super(message, 404, cause);
    }
}
exports.notFound = notFound;
class conflict extends ErrorApllication {
    constructor(message, cause) {
        super(message, 409, cause);
    }
}
exports.conflict = conflict;
class unprocessableEntity extends ErrorApllication {
    constructor(message, cause) {
        super(message, 422, cause);
    }
}
exports.unprocessableEntity = unprocessableEntity;
class tooManyRequests extends ErrorApllication {
    constructor(message, cause) {
        super(message, 429, cause);
    }
}
exports.tooManyRequests = tooManyRequests;
class internalServerError extends ErrorApllication {
    constructor(message, cause) {
        super(message, 500, cause);
    }
}
exports.internalServerError = internalServerError;
class notImplemented extends ErrorApllication {
    constructor(message, cause) {
        super(message, 501, cause);
    }
}
exports.notImplemented = notImplemented;
class badGateway extends ErrorApllication {
    constructor(message, cause) {
        super(message, 502, cause);
    }
}
exports.badGateway = badGateway;
class serviceUnavailable extends ErrorApllication {
    constructor(message, cause) {
        super(message, 503, cause);
    }
}
exports.serviceUnavailable = serviceUnavailable;
