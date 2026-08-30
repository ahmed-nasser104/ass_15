import { Errors } from "../../interfaces/error.interface";

class ErrorApllication extends Error implements Errors {
  constructor(
    message: string,
    public status: number,
    cause?: unknown,
  ) {
    super(message, { cause });
  }
}

export class badRequest extends ErrorApllication {
  constructor(message: string, cause?: unknown) {
    super(message, 400, cause);
  }
}

export class unauthorized extends ErrorApllication {
  constructor(message: string, cause?: unknown) {
    super(message, 401, cause);
  }
}

export class forbidden extends ErrorApllication {
  constructor(message: string, cause?: unknown) {
    super(message, 403, cause);
  }
}

export class notFound extends ErrorApllication {
  constructor(message: string, cause?: unknown) {
    super(message, 404, cause);
  }
}

export class conflict extends ErrorApllication {
  constructor(message: string, cause?: unknown) {
    super(message, 409, cause);
  }
}

export class unprocessableEntity extends ErrorApllication {
  constructor(message: string, cause?: unknown) {
    super(message, 422, cause);
  }
}

export class tooManyRequests extends ErrorApllication {
  constructor(message: string, cause?: unknown) {
    super(message, 429, cause);
  }
}

export class internalServerError extends ErrorApllication {
  constructor(message: string, cause?: unknown) {
    super(message, 500, cause);
  }
}

export class notImplemented extends ErrorApllication {
  constructor(message: string, cause?: unknown) {
    super(message, 501, cause);
  }
}

export class badGateway extends ErrorApllication {
  constructor(message: string, cause?: unknown) {
    super(message, 502, cause);
  }
}

export class serviceUnavailable extends ErrorApllication {
  constructor(message: string, cause?: unknown) {
    super(message, 503, cause);
  }
}
