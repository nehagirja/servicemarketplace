import * as serviceMethod from "../services/service-service.js";
import {
    setSuccess,
    setError,
    setBadRequest,
    setUnauthorized,
    setForbidden,
    setInternalServerError,
    setConflict,
    setNotFound
} from "../utils/response-handlers.js";

export const createService = async (request, response) => {
    try {
        const newService = { ...request.body };
        const service = await serviceMethod.save(newService);
        setSuccess(service, "Service created Successfully", response);
    } catch (error) {
        setError(error, response);
    }
};

export const getAllServices = async (request, response) => {
    try {
        
        const page = parseInt(request.query.page) || 1;
        const count = parseInt(request.query.count) || 10;

        const services = await serviceMethod.fetchAllServices(page, count);

        const totalServices = await serviceMethod.getTotalServiceCount();
        const totalPages = Math.ceil(totalServices / count);

        const responseData = {
            metadata: {
                total_items: totalServices,
                total_pages: totalPages,
                current_page: page
            },
            items: services
        };

        setSuccess(responseData, null, response);
    } catch (error) {
        setError(error, response);
    }
};

export const getServiceById = async (request, response) => {
    try {
        const { id } = request.params;
        const service = await serviceMethod.findById(id);
        setSuccess(service,null, response);
    }
    catch (error) {
        setError(error, response);
    }
};

export const updateService = async (request, response) => {
    try {
        const data = { ...request.body };
        const { id } = request.params;
        const service = await serviceMethod.findByIdAndUpdate(id, data);
        setSuccess(service,"Service updated successfully", response);
    } catch (error) {
        setError(error, response);
    }

};

export const partialUpdateService = async (request, response) => {

    try {
        const data = { ...request.body };
        const { id } = request.params;
        const service = await serviceMethod.findByIdAndUpdate(id, data);
        setSuccess(service,"Service updated successfully", response);
    } catch (error) {
        setError(error, response);
    }

};

export const deleteService = async (request, response) => {
    try {
        const { id } = request.params;
        const result = await serviceMethod.findByIdAndDelete(id);
        setSuccess(result,"Service updated successfully", response);
    } catch (error) {
        setError(error, response);
    }
};


