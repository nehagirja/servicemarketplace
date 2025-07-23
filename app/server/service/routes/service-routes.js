import express from "express";
import * as serviceController from "../controllers/service-controller.js";

const router = express.Router();

// router.route("/post")
   

router.route("/")   
    .get(serviceController.getAllServices)
    .post(serviceController.createService);

router.route('/:id')
    .get(serviceController.getServiceById)
    .put(serviceController.updateService)
    .patch(serviceController.partialUpdateService)
    .delete(serviceController.deleteService);

export default router;