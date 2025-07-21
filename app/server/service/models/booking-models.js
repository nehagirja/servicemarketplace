import mongoose from "mongoose";
const {Schema} = mongoose;

const BookingSchema = new mongoose.Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }, // FK to User table (MongoDB _id)
    service_provider_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ServiceProvider', 
        required: true 
    }, // FK to ServiceProvider table (MongoDB _id)
    service_type_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ServiceType', 
        required: true 
    }, // FK to ServiceType table (MongoDB _id)
    street_address : { 
        type: String, 
        required: true 
    },
    unit_apt :{
        type: String, 
        required: true
    },
    task_details:{
        type: String, 
        required: true
    }, // Street address of the booking
    date: { 
        type: Date, 
        required: true 
    }, // Date of the booking
    start_time: { 
        type: String, 
        required: true 
    }, // Start time (e.g., "12:00")
    number_of_hours: { 
        type: String, 
        required: true 
    }, // Duration in hours (e.g., "02:00")
    total_amount: { 
        type: Number, 
        required: true 
    }, // Total amount for the service
    status: { 
        type: String, 
        enum: ['pending', 'confirmed', 'completed', 'cancelled'], 
        required: true 
    }, // Booking status with predefined values
    created_at: { 
        type: Date, 
        default: Date.now 
    }, // Automatically set to current date/time
    updated_at: { 
        type: Date, 
        default: Date.now 
    }
});

// Add pre-save middleware to update `updated_at`
BookingSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});


const BookingModel = mongoose.model("Booking", BookingSchema);

export default BookingModel;