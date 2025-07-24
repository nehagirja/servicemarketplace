import ServiceModel from "./../models/service-models.js";


export const save = (newService) => {
    const service = new ServiceModel(newService);
    return service.save();
};


// export const getAllServices = async (page, count) => {
//     const skip = (page - 1) * count;
//     const totalItems = await ServiceModel.countDocuments();
//     const items = await ServiceModel.find().skip(skip).limit(count);
//     return {
//         total_items: totalItems,
//         total_pages: Math.ceil(totalItems / count),
//         current_page: page,
//         items,
//     };
// };


// Find all Users with parameterized query
export const fetchAllServices = (page, count) => {
    const skip = (page - 1) * count;
    const query = {};
    
    return ServiceModel.find(query).skip(skip).limit(count);
};

// Count users by first name
export const getTotalServiceCount = () => {
    return ServiceModel.countDocuments();
};

export const findAll = () =>{
    return ServiceModel.find();
};


export const findById = async (id) => {
    return ServiceModel.findById(id);
};

export const updateService = async (id, data) => {
    return ServiceModel.findByIdAndUpdate(id, data, { new: true });
};

export const findByIdAndUpdate = async (id, data) => {
    return ServiceModel.findByIdAndUpdate(id, data, { new: true });
};

export const findByIdAndDelete = async (id) => {
    const result = await ServiceModel.findByIdAndDelete(id);
    return result !== null;
};
