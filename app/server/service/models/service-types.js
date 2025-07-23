import mongoose from "mongoose";

// Define the schema for service types
const ServiceTypeSchema = new mongoose.Schema({
    role_type: {
        type: String,
        required: true, 
        trim: true    
    },
    description: {
        type: String,
        required: true, 
        trim: true     
    },
    image:{
        type: String,
        required: false
    },
    card_image:{
        type: String,
        required: false,
    },
    popular:{
        type: Boolean,
        required: false,
    },
});

const ServiceTypeModel = mongoose.model("ServiceType", ServiceTypeSchema);

export default ServiceTypeModel;

