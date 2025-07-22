import mongoose from "mongoose";

const peopleSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
    },
    address: {
        street: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        country: {
            type: String,
        },
        zipCode: {
            type: String,
        },
    },
    role: {
        type: String,
        required: true, 
    },
    roleAttributes: {
        service: {
            serviceTypeId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "ServiceType", 
            },
            hourlyRate: {
                type: Number,
            },
            description: {
                type: String,
            },
        },
        permissions: {
            type: [String], 
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    lastLogin: {
        type: Date,
    },
});

const PeopleModel = mongoose.model("Person", peopleSchema);

export default PeopleModel;
