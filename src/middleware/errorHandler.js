export const errorHandler = {};

errorHandler.notFound = (req, res, next) => {
        const err = new Error("not found");
        err.status = 404;
        next(err);
}

errorHandler.duplicate = (req, res, next) => {
        const err = new Error("Dish already exists.");
        err.status = 409;
        next(err);
}

errorHandler.defaultError = (err, req, res, next) => {
        const status = err.status || 500;
        res.json({
                status: status,
                message: err.message
        })
}
