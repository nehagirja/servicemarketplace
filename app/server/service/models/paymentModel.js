import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    email: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "usd" },
    bookingId: { type: String, required: true },
    status: { type: String, default: "pending" }, // e.g., pending, succeeded, failed
    createdAt: { type: Date, default: Date.now },
});

const Payment = mongoose.model("payments", paymentSchema);

export default Payment;
