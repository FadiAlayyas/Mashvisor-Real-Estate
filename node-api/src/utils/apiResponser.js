class ApiResponser {
    static success(res, data = null, message = 'Success', statusCode = 200) {
        return res.status(statusCode).json({
            success: true,
            message,
            data,
            timestamp: new Date().toISOString()
        });
    }

    static error(res, message = 'Internal Server Error', statusCode = 500, errors = null) {
        return res.status(statusCode).json({
            success: false,
            message,
            errors,
            timestamp: new Date().toISOString()
        });
    }

    static created(res, data = null, message = 'Resource created successfully') {
        return this.success(res, data, message, 201);
    }

    static notFound(res, message = 'Resource not found') {
        return this.error(res, message, 404);
    }

    static badRequest(res, message = 'Bad request', errors = null) {
        return this.error(res, message, 400, errors);
    }

    static unauthorized(res, message = 'Unauthorized access') {
        return this.error(res, message, 401);
    }

    static forbidden(res, message = 'Access forbidden') {
        return this.error(res, message, 403);
    }

    static noContent(res) {
        return res.status(204).send();
    }

    static collection(res, items = [], meta = null) {
        const response = {
            success: true,
            message: 'Success',
            data: items,
            timestamp: new Date().toISOString()
        };

        if (meta) {
            response.meta = meta;
        }

        return res.status(200).json(response);
    }
}

module.exports = ApiResponser;