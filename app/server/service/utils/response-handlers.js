export const setSuccess = (data, message, response) => {
    response.status(200).json({
        message: message || "Success",
        data: data
    });
};

export const setResourceCreated = (data, message, response) => {
    response.status(201).json({
        message: message || "Resource created successfully",
        data: data
    });
};

export const setResourceUpdated = (data, message, response) => {
    response.status(204).json({
        message: message || "Resource updated successfully",
        data: data
    });
};

export const setError =(error,response)=>{
    // Default to 500 if no status is provided
    console.log("Error: ",error);
    let statusCode = error.status || 500;
    // Set response status and send error details
    response.status(statusCode);
    response.json({
        code: error.code || "GenericError",
        message: error.message || "Error occurred while processing the request"
    });
};
export const setBadRequest = (error, response) => {
    response.status(400);
    response.json({
        code: "BadRequest",
        message: error.message || "Invalid input parameters",
    });
};

export const setUnauthorized = (error, response) => {
    response.status(401);
    response.json({
        code: "Unauthorized",
        message: error.message || "Authentication required",
    });
};

export const setForbidden = (error, response) => {
    response.status(403);
    response.json({
        code: "Forbidden",
        message: error.message || "Access to the resource is not allowed",
    });
};

export const setInternalServerError = (error, response) => {
    response.status(500);
    response.json({
        code: "ServerError",
        message: error.message || "Internal server error occurred",
    });
};

export const setNotFound = (error, response) => {
    response.status(404);
    response.json({
        code: "NotFound",
        message: error.message || "Resource not found",
    });
};

// Set Conflict response (HTTP 409)
export const setConflict = (error, response) => {
    response.status(409).json({
        message: "Conflict",
        error: error.message || "Resource already exists"
    });
};
