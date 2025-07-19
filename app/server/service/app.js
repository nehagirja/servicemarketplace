import initializeRoutes from "./routes/index.js";
import mongoose from "mongoose";
import cors from "cors";
import express from "express";

const initialize = (app)=>{
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded());
    mongoose.connect(process.env.MONGO_CONNECTION)
    initializeRoutes(app);
}

export default initialize;