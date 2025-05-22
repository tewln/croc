export class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = 'BadRequestError';
        this.statusCode = 400;
    }
}

export class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UnauthorizedError';
        this.statusCode = 401;
    }
}

export class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
        this.statusCode = 404;
    }
}

export class ValidationError extends Error {
    constructor(message, fields = []) {
        super(message);
        this.name = 'ValidationError';
        this.statusCode = 422;
        this.fields = fields; // Поля, содержащие ошибки валидации
    }
}

export class ForbiddenError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ForbiddenError';
        this.statusCode = 403;
    }
}

export class ConflictError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ConflictError';
        this.statusCode = 409;
    }
}

export class InternalServerError extends Error {
    constructor(message = 'Внутренняя ошибка сервера') {
        super(message);
        this.name = 'InternalServerError';
        this.statusCode = 500;
    }
}

export class ServiceUnavailableError extends Error {
    constructor(message = 'Сервис временно недоступен') {
        super(message);
        this.name = 'ServiceUnavailableError';
        this.statusCode = 503;
    }
}