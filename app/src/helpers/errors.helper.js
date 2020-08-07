class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

const handleError = (err, res) => {
    let { statusCode, message } = err;
    
    res.status(statusCode).json({
        status: "error",
        statusCode: statusCode || 500,
        message: message || "Unhandled service error"
    });
};

module.exports = {
    ErrorHandler,
    handleError
}