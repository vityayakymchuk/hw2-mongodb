import createHttpError from "http-errors";

export const validateBody = (validateSchema) => {
    return async (req, res, next) => {
        try {
            await validateSchema.validateAsync(req.body, { abortEarly: false });
            next();
        } catch (err) {
            next(createHttpError(400, 'Bad request', { err: err.details }));
        };
    };
};
