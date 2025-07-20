import mongoose from "mongoose";
import {v4 as uuidv4} from "uuid";

const availabilitySchema = new mongoose.Schema({
    availabilityId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    serviceProviderId : {type: String, require: true},
    dayOfWeek : {type: String, require: true},
    startTime : {type: String, require: true},
    numberOfHours : {type: String, require: true},
    availabilityStatus : {type: Boolean, require: true},
});

availabilitySchema.set("toJSON", {
    transform: (doc, ret) => {
        ret._id = ret._id.toString(); 
        return ret;
    }
});

const AvailabilitySchema = mongoose.model("Availability", availabilitySchema);
export default AvailabilitySchema;