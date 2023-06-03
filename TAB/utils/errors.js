class ValidationError extends Error {}

const handleError = (err, req, res, next) => {
    // if (err instanceof NotFoundError) {
    //     res
    //         .status(404)
    //         .render('error', {
    //             message: 'nie można znaleźć elementu o danym id',
    //         });
    //     return;
    // }
    console.error(err);

    res
        .status(err instanceof ValidationError ? 400 : 500)
        .render('error', {
            message: err instanceof ValidationError ? err.message : 'Przepraszamy, spróbuj ponownie później.',
        })
};

module.exports = {
    handleError,
    ValidationError,
}