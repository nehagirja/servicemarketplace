import Availability from "../models/availability.js";

export const save = (newAvailability) => {
    const availablity = new Availability(newAvailability);
    return availablity.save();
}

export const getAllAvailability = async() => {
    const allAvailability = await Availability.find();
    console.log("ALL Availability : " + JSON.stringify(allAvailability))
    return allAvailability;
}

export const getAvailabilityById = async(availablityId) => {
    console.log("Availability by Id")
    const availablityById = await Availability.findById(availablityId);
    return availablityById;
}

export const updateAvailabilityById = async(availablityId, newAvailabilityData) => {
    console.log("Update Availability by Id")
    const updatedAvailability = await Availability.findByIdAndUpdate(availablityId, newAvailabilityData, { new: true, overwrite: true, runValidators: true});
    console.log("TEST : " + updatedAvailability)
    return updatedAvailability;
}

export const updateAvailabilityFieldsById = async(availablityId, newAvailabilityFields) => {
    console.log("Update Availability Fields by Id")
    const updatedAvailability = await Availability.findByIdAndUpdate(availablityId, newAvailabilityFields, { new: true, runValidators: true});
    return updatedAvailability;
}

export const deleteAvailabilityById = async(availablityId) => {
    console.log("Delete Availability by Id")
    const deletedAvailability = await Availability.findByIdAndDelete(availablityId);
    return deletedAvailability;
}

