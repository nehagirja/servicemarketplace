import mongoose from "mongoose";

// Define the schema for a service provider
const ServiceProviderSchema = new mongoose.Schema({
    business_name: {
        type: String,
        required: true
    },
    service_types: {
        type: Object,
        required: true
    },
    hourly_rate: {
        type: Number,
        required: true
    },
    availability_id: {
        type: Number,
        required: true
    },
    ranking_payment: {
        type: Number,
        default: 0
    },
    is_premium: {
        type: Boolean,
        default: false
    }
});

const ServiceProviderModel = mongoose.model('ServiceProvider', ServiceProviderSchema);

export default ServiceProviderModel;