import { request, response } from "express";
import dotenv from "dotenv";

import Stripe from "stripe";
import {
    setSuccess,
    setError,
    setBadRequest,
    setUnauthorized,
    setForbidden,
    setInternalServerError,
    setConflict,
    setResourceCreated,
    setNotFound
} from "../utils/response-handlers.js";
import Payment from "../models/paymentModel.js"; 


dotenv.config();

// Create a Stripe Checkout session
export const createCheckoutSession = async (req,res) => {
    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

        const { email, amount } = req.body;

        if (!email || !amount) {
            return res.status(400).json({ error: "Email and amount are required." });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "Custom Payment",
                        },
                        unit_amount: amount * 100, // Convert to cents
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
           // success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            success_url: `http://localhost:3000/payment-success`,
            cancel_url: `http://localhost:3000/payment-failure`,
            customer_email: email,
        });

       
        const payment = new Payment({
            email,
            amount,
            currency: "usd",
            bookingId: session.id,
            status: "pending", // Default status
        });
        console.log("Payment:", payment);
        await payment.save();
        res.status(200).json({ id: session.id });
    } catch (error) {
        console.error("Error creating checkout session:", error.message);
        res.status(500).json({ error: error.message });
    }
};
