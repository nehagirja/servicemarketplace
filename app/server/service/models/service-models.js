// models/service-model.js
import mongoose from "mongoose";
const {
    Schema
} = mongoose;

const ServiceSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    userId: {
        type: Number
    },
    service_provider_id: {
        type: Number
    },
    price: {
        type: Number
    },
    duration: {
        type: Number
    }
});

const ServiceModel = mongoose.model("service", ServiceSchema);

export default ServiceModel;