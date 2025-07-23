// Import route handlers for different application resources.
import usersRoute from "./user-routes.js";
import serviceRoute from "./service-routes.js";
import availabilityRouter from "./availability-routes.js";
import peopleRouter from "./people-routes.js";
import reviewsRouter from "./reviews-routes.js";
import bookingRouter from "./booking-routes.js";
import providerRouter from "./service-provider-routes.js";
import reviewRoute from "./reviews-routes.js";
import serviceTypeRoute from "./service-type-routes.js";
import paymentRoutes from "./paymentRoute.js";


import authRouter from "./auth-route.js";
/*The current EcmaScript in Node.js LTS (v20.17.0) still marks import assertions as experimental for the below commented code. 
Need to check NodeJS documentation.*/

// import routes from "../utils/routes.json" assert { type: "json" };

import { createRequire } from "module";
import { authenticate } from "../middleware/auth-middleware.js";

const require = createRequire(import.meta.url);
const routes = require("../utils/routes.json");

const initializeRoutes = (app) => {
    // app.use(authenticate); // Global middleware
    app.use(routes.users, usersRoute);
    app.use(routes.service, authenticate, serviceRoute);
    app.use(routes.availability, authenticate, availabilityRouter);
    app.use(routes.people, authenticate, peopleRouter);
    app.use(routes.reviews, authenticate, reviewsRouter);
    app.use(routes.booking, authenticate, bookingRouter);
    app.use(routes.serviceproviders, authenticate, providerRouter);
    app.use(routes.reviews, authenticate, reviewRoute);
    app.use(routes.servicetypes, authenticate, serviceTypeRoute);
    app.use(routes.auth, authRouter);
    app.use(routes.payment, paymentRoutes);

}

export default initializeRoutes;
