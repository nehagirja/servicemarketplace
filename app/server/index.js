import dotenv from "dotenv";
import express from "express"
import initialize from "./service/app.js";

dotenv.config();
const app = express();
app.use(express.json({ limit: '5mb' })); // Try 5MB or larger
app.use(express.urlencoded({ limit: '5mb', extended: true })); // For form data
const port = process.env.PORT; 
initialize(app);

app.listen(port,()=>{
    console.log(`Listening to port ${port}`)
})