import { request, response } from "express";
import * as peopleService from "./../services/people-service.js";

export const post = async(request, response) => {
    const newPeople = {...request.body};
    console.log("REQUEST BODY RECEVICED : " + request);
    const people = await peopleService.save(newPeople);
    response.status(200);
    response.json(people);
}

export const getAllPeople = async(request, response) => {
    try{
        const allPeople = await peopleService.getAllUsers();
        response.status(200).json(allPeople);
    }catch(error){
        response.status(500).json({ message: error.message });
    }
}